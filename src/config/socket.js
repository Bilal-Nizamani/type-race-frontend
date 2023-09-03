import io from "socket.io-client";

const socket = io("http://localhost:3001");
// const socket = io("http://localhost:3001", {
//   transports: ["websocket"],
// });
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

export default socket;
