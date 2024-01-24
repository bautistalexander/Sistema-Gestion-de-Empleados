import mongoose from "mongoose";

const { Schema, model } = mongoose;

const empladoSchema = new Schema({
  ci: { 
    type: String, 
    required: true, 
    unique: true 
  },
  nom_completo: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  cargo: { 
    type: 
    String, 
    required: 
    true, 
    lowercase: true 
  },
  salario: { 
    type: String, 
    required: true 
  },
  nombre_departamento: { 
    type: String, 
    required: true, 
    lowercase: true
  }
});

export const Empleado = model('Empleado', empladoSchema);
