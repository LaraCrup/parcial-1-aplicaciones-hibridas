import Plato from "../models/platoModel.js";
import dotenv from "dotenv";

dotenv.config();
const secret_key = process.env.SECRET_KEY;

// Funciones de validación
const validarCamposRequeridos = (datos) => {
    const { nombre, descripcion, region, tipo, ingredientes, tiempoCoccion, dificultad } = datos;
    if (!nombre || !descripcion || !region || !tipo || !ingredientes || !tiempoCoccion || !dificultad) {
        return { esValido: false, mensaje: "Todos los campos son requeridos" };
    }
    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
        return { esValido: false, mensaje: "Debe incluir al menos un ingrediente" };
    }
    return { esValido: true };
};

const validarTipoPlato = (tipo) => {
    const tiposValidos = ['dulce', 'salado'];
    if (!tiposValidos.includes(tipo)) {
        return { esValido: false, mensaje: "Tipo de plato no válido. Debe ser: dulce o salado" };
    }
    return { esValido: true };
};

const validarDificultad = (dificultad) => {
    const dificultadesValidas = ['fácil', 'media', 'difícil'];
    if (!dificultadesValidas.includes(dificultad)) {
        return { esValido: false, mensaje: "Dificultad no válida. Debe ser: fácil, media o difícil" };
    }
    return { esValido: true };
};

const validarTiempoCoccion = (tiempo) => {
    if (!Number.isInteger(tiempo) || tiempo <= 0) {
        return { esValido: false, mensaje: "El tiempo de cocción debe ser un número entero positivo" };
    }
    return { esValido: true };
};

const validarId = (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return { esValido: false, mensaje: "ID no válido" };
    }
    return { esValido: true };
};

const validarTiposDatos = (datos) => {
    const { nombre, descripcion, region, tipo, ingredientes, tiempoCoccion, dificultad } = datos;
    
    if (nombre && typeof nombre !== 'string') {
        return { esValido: false, mensaje: "El nombre debe ser una cadena de texto" };
    }
    
    if (descripcion && typeof descripcion !== 'string') {
        return { esValido: false, mensaje: "La descripción debe ser una cadena de texto" };
    }
    
    if (region && typeof region !== 'string') {
        return { esValido: false, mensaje: "La región debe ser una cadena de texto" };
    }
    
    if (tipo && typeof tipo !== 'string') {
        return { esValido: false, mensaje: "El tipo debe ser una cadena de texto" };
    }

    if (ingredientes && !Array.isArray(ingredientes)) {
        return { esValido: false, mensaje: "Los ingredientes deben ser un array" };
    }

    if (ingredientes && !ingredientes.every(ing => typeof ing === 'string')) {
        return { esValido: false, mensaje: "Todos los ingredientes deben ser cadenas de texto" };
    }
    
    if (tiempoCoccion && typeof tiempoCoccion !== 'number') {
        return { esValido: false, mensaje: "El tiempo de cocción debe ser un número" };
    }
    
    if (dificultad && typeof dificultad !== 'string') {
        return { esValido: false, mensaje: "La dificultad debe ser una cadena de texto" };
    }
    
    return { esValido: true };
};

const getPlatos = async (req, res) => {
    try {
        const platos = await Plato.find();
        res.status(200).json({ msg: "OK", data: platos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", data: [] });
    }
}

const setPlato = async (req, res) => {
    try {
        const validacionTipos = validarTiposDatos(req.body);
        if (!validacionTipos.esValido) {
            return res.status(400).json({ msg: validacionTipos.mensaje });
        }

        const validacionCampos = validarCamposRequeridos(req.body);
        if (!validacionCampos.esValido) {
            return res.status(400).json({ msg: validacionCampos.mensaje });
        }

        const validacionTipo = validarTipoPlato(req.body.tipo);
        if (!validacionTipo.esValido) {
            return res.status(400).json({ msg: validacionTipo.mensaje });
        }

        const validacionDificultad = validarDificultad(req.body.dificultad);
        if (!validacionDificultad.esValido) {
            return res.status(400).json({ msg: validacionDificultad.mensaje });
        }

        const validacionTiempo = validarTiempoCoccion(req.body.tiempoCoccion);
        if (!validacionTiempo.esValido) {
            return res.status(400).json({ msg: validacionTiempo.mensaje });
        }

        const { nombre, descripcion, region, tipo, ingredientes, tiempoCoccion, dificultad } = req.body;
        const plato = await Plato.findOne({ nombre: nombre });
        if (plato) {
            return res.status(404).json({ msg: "El plato ya existe" });
        }
        const platoNuevo = new Plato({ nombre, descripcion, region, tipo, ingredientes, tiempoCoccion, dificultad });
        platoNuevo.save();
        const id = platoNuevo._id;
        res.status(202).json({ msg: "Plato guardado", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor. No se pudo guardar el plato", error });
    }
}

const deletePlatoById = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Plato.findByIdAndDelete(id);
        if (status) {
            res.status(200).json({ msg: "Plato eliminado", data: [] });
        } else {
            return res.status(404).json({ msg: "Plato no encontrado", data: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", error });
    }
}

const updatePlatoById = async (req, res) => {
    try {
        const validacionTipos = validarTiposDatos(req.body);
        if (!validacionTipos.esValido) {
            return res.status(400).json({ msg: validacionTipos.mensaje });
        }

        const validacionId = validarId(req.params.id);
        if (!validacionId.esValido) {
            return res.status(400).json({ msg: validacionId.mensaje });
        }

        if (req.body.tipo) {
            const validacionTipo = validarTipoPlato(req.body.tipo);
            if (!validacionTipo.esValido) {
                return res.status(400).json({ msg: validacionTipo.mensaje });
            }
        }

        if (req.body.dificultad) {
            const validacionDificultad = validarDificultad(req.body.dificultad);
            if (!validacionDificultad.esValido) {
                return res.status(400).json({ msg: validacionDificultad.mensaje });
            }
        }

        if (req.body.tiempoCoccion) {
            const validacionTiempo = validarTiempoCoccion(req.body.tiempoCoccion);
            if (!validacionTiempo.esValido) {
                return res.status(400).json({ msg: validacionTiempo.mensaje });
            }
        }

        const { id } = req.params;
        const plato = req.body;
        const platoNuevo = await Plato.findByIdAndUpdate(id, plato, { new: true });
        if (!platoNuevo) {
            return res.status(404).json({ msg: "ID no encontrado", data: [] });
        } else {
            res.status(200).json({ msg: "OK", data: plato });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", error });
    }
}

const getPlatoByNombre = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const plato = await Plato.findOne({ nombre: nombre });
        if (!plato) {
            return res.status(404).json({ msg: "Plato no encontrado", data: [] });
        } else {
            res.status(200).json({ msg: "OK", data: plato });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", error });
    }
} 

const getPlatosByTipo = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const platos = await Plato.find({ tipo: tipo });
        if (platos.length === 0) {
            return res.status(404).json({ msg: "No hay platos de ese tipo", data: [] });
        }
        res.status(200).json({ msg: "OK", data: platos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", error });
    }
}

const getPlatosByDificultad = async (req, res) => {
    try {
        const dificultad = req.params.dificultad;
        const platos = await Plato.find({ dificultad: dificultad });
        if (platos.length === 0) {
            return res.status(404).json({ msg: "No hay platos con esa dificultad", data: [] });
        }
        res.status(200).json({ msg: "OK", data: platos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", error });
    }
}

export {getPlatos, setPlato, getPlatoByNombre, deletePlatoById, updatePlatoById, getPlatosByTipo, getPlatosByDificultad};