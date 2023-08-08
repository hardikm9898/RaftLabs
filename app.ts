import express, { NextFunction, Response, Request } from 'express';
const app = express();
import path from 'path';
require('dotenv').config();

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(` chat server is runnig on ${port} port `);
});
const connectionCount = new Set();
// const htmlFile = path.join(__dirname, 'public', 'chat.html');
app.use(express.static(path.join(__dirname, 'public')));

import bodyParser from 'body-parser';
import './data/connect';

import isAuth from './middleware/isAuth';
import authRoute from './routes/auth';

app.use(bodyParser.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use('/auth', authRoute);

app.use('/', isAuth, (req: any, res: Response) => {
  const { userName } = req.user;
  res.render('chat', { userName });
});
import socketio from 'socket.io';

// io(server)
const io = new socketio.Server(server);

io.on('connection', (socket) => {
  connectionCount.add(socket.id);
  io.emit('countconnection', connectionCount.size);
  socket.on('disconnect', () => {
    connectionCount.delete(socket.id);
    io.emit('countconnection', connectionCount.size);
  });
  socket.on('message', (data) => {
    socket.broadcast.emit('brodcastmessage', data);
  });
  socket.on('feedback', (data) => {
    socket.broadcast.emit('brodcastfeedback', data);
  });
});
