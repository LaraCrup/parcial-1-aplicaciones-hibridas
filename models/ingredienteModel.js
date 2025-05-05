import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ingredienteSchema = new Schema({
    nombre: { type: String },
    descripcion: { type: String },
    tipo: { type: String, enum: ['vegetal', 'carne', 'lácteo', 'cereal', 'condimento', 'otro'] },
    alergeno: { type: Boolean },
});

const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);
export default Ingrediente;