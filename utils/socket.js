import { io } from "socket.io-client";
const socket = io.connect("http://localhost:6969");
export default socket;