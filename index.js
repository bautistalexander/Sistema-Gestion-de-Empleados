import 'dotenv/config'
import './src/database/config.js'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './src/routes/auth.routes.js'
import departamentoRouter from './src/routes/departamento.routes.js'
import empleadoRouter from './src/routes/empleado.routes.js';

const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback){
    if (!origin || whiteList.includes(origin)) {
      return callback(null, origin);
    }
    return callback('Error de Cors origin: ' + origin + ' no autorizado')
  }
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/departamento', departamentoRouter);
app.use('/api/v1/empleado', empleadoRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('http://localhost:' + PORT));

