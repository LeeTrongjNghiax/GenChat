import { io } from "socket.io-client";
const socket = io.connect("http://localhost:6969");
console.log(socket)

export default socket;