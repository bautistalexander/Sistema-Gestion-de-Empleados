import { Router } from 'express';
import { actualizarDepartamento, crearDepartamento, eliminarDepartamento, empleadosDepartamento, listarDepartamentos, obtenerDepartamento } from '../controllers/departamento.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyDepartamentoValidator } from '../middlewares/validatorManager.js';

const router = Router();

router.get('/', requireToken, listarDepartamentos); // Lista todos los departamentos
router.get('/:id', requireToken, obtenerDepartamento); // Obtiene el departamento con id
router.post('/', requireToken, bodyDepartamentoValidator, crearDepartamento); // Crear un nuevo departamento
router.delete('/:id', requireToken, eliminarDepartamento); // Elimina el departamento con id
router.patch('/:id', requireToken, actualizarDepartamento); // Actualiza el departamento con id

router.get('/:nombre_departamento/empleados', requireToken, empleadosDepartamento); // Lista los empleados del departamento de nombre_departamento


export default router;