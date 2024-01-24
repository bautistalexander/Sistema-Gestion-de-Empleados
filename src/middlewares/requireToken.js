import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
  try {

    let token = req.headers?.authorization;
    if (!token) {
      throw new Error('No Bearer');
    }

    token = token.split(' ')[1];
    const { uid } =  jwt.verify(token, process.env.JWT_SECRET); // payload
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    
    const tokenVerificationErrors = {
      'invalid signature': 'La firma de JWT no es válida ',
      'jwt expired': 'JWT expirado',
      'invalid token': 'Token no válido',
      'No Bearer': 'Utiliza formato Bearer',
      'jwt malformed': 'JWT formato no valido'
    };
    return res.status(401).send({ error: tokenVerificationErrors[error.message] });
  }
};