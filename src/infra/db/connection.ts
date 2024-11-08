import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:27017/mydatabase', {})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de conexão:', err));
