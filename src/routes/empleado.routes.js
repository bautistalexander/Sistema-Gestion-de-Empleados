import { Router } from 'express';
import { eliminarEmpleado, listarEmpleados, modificarEmpleado, obtenerEmpleado, obtenerEmpleadoSalario, registrarEmpleado } from '../controllers/empleado.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyEmpleadoValidator } from '../middlewares/validatorManager.js';

const router = Router();

router.get('/', requireToken, listarEmpleados); // Lista a todos los empleados
router.get('/:id', requireToken, obtenerEmpleado); // Obtiene al empleado con id
router.post('/registrar', requireToken, bodyEmpleadoValidator, registrarEmpleado); // Registra empleado
router.delete('/:id', requireToken, eliminarEmpleado); // Elimina Empleado con id
router.put('/:id', requireToken, modificarEmpleado); // Modifica la informacion del empleado con id

router.get('/:salario/salario', requireToken, obtenerEmpleadoSalario); // Ontiene a los empleados con un salario igual a salario


export default router;