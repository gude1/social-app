import Echo from 'laravel-echo';
import socketio from 'socket.io-client';
let echoinstance = null;
try {
  echoinstance = new Echo({
    host: 'http://127.0.0.1:6001',
    broadcaster: 'socket.io',
    client: socketio,
  });
} catch (err) {
  alert(`inside ${err.toString()}`);
}

export default echoinstance;
