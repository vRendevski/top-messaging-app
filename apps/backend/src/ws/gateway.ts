import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import Stream from "stream";

class WSServer {
  server: WebSocketServer;

  constructor(){
    this.server = new WebSocketServer({ clientTracking: false, noServer: true })
  }

  upgrade(this: WSServer, req: IncomingMessage, socket: Stream.Duplex, head: Buffer){
  }
}

export default new WSServer();