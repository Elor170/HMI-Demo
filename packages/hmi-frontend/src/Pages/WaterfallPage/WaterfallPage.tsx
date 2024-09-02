import SocketIOClient from 'socket.io-client';
import { WATERFALL_BACKEND_URL } from '@/Helper/consts';
import axios from 'axios';

const response = await axios.get('http://localhost:3002/newer-waterfall-data', {
  params: {
      time: new Date("2024-09-01T13:47:59.878Z"),
  }
});
console.log(response.data);


const io = SocketIOClient(WATERFALL_BACKEND_URL);
io.on('waterfallToFrontend', (data: WaterfallObject) => {
  data.frontendTime = new Date();
  io.emit('waterfallToBackend', data)
})

export default function WaterfallPage() {
  return (
    <div>WaterfallPage</div>
  )
}
