import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

usuarioSchema.pre('save', async function(next){
  const usuario = this;

  if (!usuario.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(usuario.password, salt)
    next();
  } catch (error) {
    console.log(error);
    throw new Error('Fallo el hash de contraseña');
  }
});

usuarioSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
}

export const Usuario = model('Usuario', usuarioSchema);



