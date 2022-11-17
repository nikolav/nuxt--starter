
import { Server } from "socket.io";
import { createServer } from "http";


; (async () => {
 
  const server = createServer();
  const io = new Server(server);
  console.log({ io });

})();
