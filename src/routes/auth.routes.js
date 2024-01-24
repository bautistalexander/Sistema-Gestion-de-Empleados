import { Router } from 'express';
import { infoUsuario, login, registrar, refreshToken, logout } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

const router = Router();

router.post('/login', bodyLoginValidator, login); // Iniciar sesión
router.post('/registrar', bodyRegisterValidator, registrar); // registrarse
router.get('/logout', logout); // cerrar sesion

// rutas para la verificacion de Token y su refresh
router.get('/protected', requireToken, infoUsuario); 
router.get('/refresh', requireRefreshToken, refreshToken);


export default router;
