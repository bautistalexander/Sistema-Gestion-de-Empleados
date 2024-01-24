import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const departamentoSchema = new Schema({
  nombre_departamento: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  uid: { 
    type: Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  }
});

export const Departamento = model('Departamento', departamentoSchema);