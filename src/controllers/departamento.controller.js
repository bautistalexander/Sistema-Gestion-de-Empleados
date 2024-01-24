import { Departamento } from "../models/Departamento.js";
import { Empleado } from "../models/Empleado.js";

export const listarDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.find({uid: req.uid});

    return res.json({ departamentos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

export const crearDepartamento = async (req, res) => {
  try {
    const { nombre_departamento } = req.body;

    const departamento = new Departamento({ nombre_departamento, uid: req.uid });
    const nuevo_departamento = await departamento.save();
    
    return res.status(201).json({ ok: 'Departamento creado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

export const obtenerDepartamento = async (req, res) => {
  try {
    const {id} = req.params
    const departamento = await Departamento.findById(id);
    
    if (!departamento) {
      return res.status(404).json({error: 'El departamento no existe'});
    }

    return res.status(201).json({ departamento });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });

  }
};

export const eliminarDepartamento = async (req, res) => {
  try {
    const {id} = req.params
    const departamento = await Departamento.findById(id);
    
    if (!departamento) {
      return res.status(404).json({error: 'El departamento no existe'});
    }

    const nom_departamento = departamento.nombre_departamento;
    await Empleado.deleteMany({ nombre_departamento: nom_departamento });

    await departamento.deleteOne();

    return res.status(200).json({ departamento });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });

  }
};

export const actualizarDepartamento = async (req, res) => {
  try {
    const {id} = req.params
    const {nombre_departamento} = req.body;

    const departamento = await Departamento.findById(id);
    
    if (!departamento) {
      return res.status(404).json({error: 'El departamento no existe'});
    }

    departamento.nombre_departamento = nombre_departamento
    await departamento.save();

    return res.status(200).json({ departamento });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

export const empleadosDepartamento = async (req, res) => {
  try {
    const {nombre_departamento} = req.params
    const departamento = await Departamento.find({nombre_departamento});
    
    if (!departamento) {
      return res.status(404).json({error: 'El departamento no existe'});
    }

    const empleados = await Empleado.find({nombre_departamento});

    return res.status(200).json({ empleados });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Formato de id incorrecto' });
    }
    return res.status(500).json({ error: 'Error de servidor' });

  }
};