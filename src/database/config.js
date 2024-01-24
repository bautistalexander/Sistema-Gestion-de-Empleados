import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log('Conexion de base de datos EXITOSA')
} catch (error) {
  console.log('ERROR Conexion de base de datos' + error)
}