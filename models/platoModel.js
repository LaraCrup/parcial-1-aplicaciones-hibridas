import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const platoSchema = new Schema({
    nombre: { type: String },
    descripcion: { type: String },
    region: { type: String },
    tipo: { type: String, enum: ['dulce', 'salado'] },
    ingredientes: [{ type: String }],
    tiempoCoccion: { type: Number },
    dificultad: { type: String, enum: ['fácil', 'media', 'difícil'] },
    imagen: { type: String }
});

const Plato = mongoose.model('Plato', platoSchema);
export default Plato;