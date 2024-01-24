import { Departamento } from '../models/Departamento.js';
import { Empleado } from '../models/Empleado.js';

export const listarEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();

    return res.json({ empleados });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

export const registrarEmpleado = async (req, res) => {
  console.log(req.body);
  const { ci, nom_completo, email, cargo, salario, nombre_departamento } = req.body;
  try {
    const departamento = await Departamento.findOne({ nombre_departamento: nombre_departamento});
    if (!departamento) {
      return res.status(404).json({error: 'El departamento no existe'});
    }

    let empleado = new Empleado(
      {
        ci: ci, 
        nom_completo: nom_completo, 
        email: email, 
        cargo: cargo, 
        salario: salario, 
        nombre_departamento: nombre_departamento
      }
    );
    await empleado.save();

    return res.status(201).json({ ok: 'Empleado registrado' });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'El empleado ya se encuentra registrado' });
    }
    return res.status(500).json('Error de servidor');
  }
};

export const obtenerEmpleado = async (req, res) => {
  try {
    const {id} = req.params
    const empleado = await Empleado.findById(id);
    
    if (!empleado) {
      return res.status(404).json({error: 'El empleado no existe'});
    }

    return res.status(200).json({ departamento: empleado });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

export const eliminarEmpleado = async (req, res) => {
  try {
    const {id} = req.params
    const empleado = await Empleado.findById(id);
    
    if (!empleado) {
      return res.status(404).json({error: 'El empleado no existe'});
    }

    await empleado.deleteOne();

    return res.status(200).json({ departamento: empleado });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });

  }
};

export const modificarEmpleado = async (req, res) => {
  try {
    const {id} = req.params
    const {ci, nom_completo, email, cargo, salario, nombre_departamento} = req.body;

    const empleado = await Empleado.findById(id); 
    if (!empleado) {
      return res.status(404).json({error: 'El empleado no existe'});
    }

    const departamento = await Departamento.findOne({ nombre_departamento: nombre_departamento});
    if (!departamento) {
      return res.status(404).json({error: 'El departamento no existe'});
    }

    await empleado.updateOne({
      ci: ci,
      nom_completo: nom_completo,
      email: email,
      cargo: cargo,
      salario: salario,
      nombre_departamento: nombre_departamento
    });

    return res.status(200).json({ empleado: empleado });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });

  }
};

export const obtenerEmpleadoSalario = async (req, res) => {
  try {
    const {salario} = req.params
    const empleado = await Empleado.find({salario: salario});
    
    if (empleado.length == 0) {
      return res.status(404).json({error: 'Ningun empleado persibe el salario descrito'});
    }

    return res.status(200).json({ empleado });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de salario incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });
  }
};