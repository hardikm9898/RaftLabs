import { io, Socket } from 'socket.io-client';
// import * as io from "socket.io-client"
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);
const userInput = socket.on('countconnection', (data) => {
  return;
});
const messageInput = document.getElementById(
  'message-input'
) as HTMLInputElement;
const messageContainer = document.getElementById(
  'message-container'
) as HTMLUListElement;
const messageForm = document.getElementById('message-form') as HTMLBodyElement;
const userName = document.getElementById('name-input') as HTMLInputElement;
const totleClient = document.getElementById('client-total') as HTMLBodyElement;

socket.on('countconnection', (data) => {
  totleClient.innerHTML = `Totale client ${data}`;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  senndMessage();
});

function senndMessage() {
  if (messageInput.value === '') return;
  const data = {
    message: messageInput.value,
    dateTime: new Date(),
    name: userName.value,
  };
  socket.emit('message', data);
  ownMessage(true, data);
  messageInput.value = '';
  clearFeedBack();
}

function ownMessage(ownMessage, data) {
  const element = `<li class="${ownMessage ? 'message-right' : 'message-left'}">
        <p class="message">
        ${data.message}
          <span>${data.name} ● ${data.dateTime}</span>
        </p>
      </li> `;
  messageContainer.innerHTML += element;
  scrollAutomatic();
}
socket.on('brodcastmessage', (data) => {
  ownMessage(false, data);
});
function scrollAutomatic() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `${userName.value} typing ...`,
  });
});

messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  });
});

socket.on('brodcastfeedback', (data) => {
  clearFeedBack();
  const element = `<li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>`;
  messageContainer.innerHTML += element;
});

function clearFeedBack() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode!.removeChild(element);
  });
}
function io(arg0: string) {
  throw new Error('Function not implemented.');
}
