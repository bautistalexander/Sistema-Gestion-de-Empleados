import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const bodyRegisterValidator = [
  body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Minimo 6 caracteres')
    .trim()
    .isLength({ min: 6 }),
  body('password', 'Formato de password incorrecto')
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error('No coinciden las contraseñas');
      }
      return value;
    }),
  validationResultExpress,
]

export const bodyLoginValidator = [
  body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Minimo 6 caracteres')
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
]

export const bodyDepartamentoValidator = [
  body('nombre_departamento', 'Formato de nombre_departamento incorecto')
    .trim()
    .notEmpty(),
  validationResultExpress
]

export const bodyEmpleadoValidator = [
  body('ci', 'Formato de ci incorrecto')
    .trim()
    .notEmpty(),
  body('nom_completo', 'Formato de nom_completo incorrecto')
    .trim()
    .notEmpty(),
  body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('cargo', 'Formato de cargo incorrecto')
    .trim()
    .notEmpty(),
  body('salario', 'Formato de salario incorrecto')
    .trim()
    .notEmpty(),
  body('nombre_departamento', 'Formato de nombre_departamento incorrecto')
    .trim()
    .notEmpty(),
  validationResultExpress
]