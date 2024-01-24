import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const registrar = async(req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let usuario = new Usuario({ email: email, password: password });
    await usuario.save();

    // Generando el token JWT
    const { token, expiresIn } = generateToken(usuario.id);
    generateRefreshToken(usuario.id, res);
    // Generando el token JWT
    

    return res.status(201).json({ ok: 'usuario registrado' });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email de usuario ya se encuentra registrado' });
    }
    return res.status(500).json({ error: 'Error de d servidor' });
  }
};

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(403).json({ error: 'No existe este usuario' });
    }
    
    const repuestaPassword = await usuario.comparePassword(password);
    if (!repuestaPassword) {
      return res.status(403).json({ error: 'Contraseña incorrecta' });
      
    }

    //Generando el token JWT
    const { token, expiresIn } = generateToken(usuario.id);
    generateRefreshToken(usuario.id, res);
    //Generando el token JWT

    return res.json({ token, expiresIn });

  } catch (error) {
    console.log(error);
  }
};

export const infoUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.uid).lean();
    return res.json({ email: usuario.email, uid: usuario.id });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
}

export const refreshToken = (req, res) => {
  try {
    
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ ok: 'Sesion cerrada' });
}