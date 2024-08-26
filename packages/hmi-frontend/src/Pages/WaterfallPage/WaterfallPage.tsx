import SocketIOClient from 'socket.io-client';
import { WATERFALL_BACKEND_URL } from '@/Helper/consts';


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
