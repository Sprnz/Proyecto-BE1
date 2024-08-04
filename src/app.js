import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from 'express-handlebars';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PUERTO = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());

app.use('/api/products', productsRouter(io)); 
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
});

server.listen(PUERTO, () => {
    console.log('Escuchando en el puerto 8080');
});
