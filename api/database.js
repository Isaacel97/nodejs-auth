import Mongoose from 'mongoose';

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL debe estar definida');
}

export const connect = async () => {
  await Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Conexión a la base de datos:Exitosa');
};
