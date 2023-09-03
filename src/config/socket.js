import io from "socket.io-client";

const socket = io("http://localhost:3001");
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

export default socket;
