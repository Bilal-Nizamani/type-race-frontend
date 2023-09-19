import io from "socket.io-client";

// const socket = io("http://localhost:3001");
// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

// export default socket;

// const socketService = {
//   socket: null,

//   connect: function (message) {
//     try {
//       console.log("adfasdf");
//       this.socket = io("http://localhost:3001");

//       if (!this.socket) {
//         throw new Error("didnt got any socket");
//       }

//       this.socket.on("connect", () => {
//         console.log("connected", message);
//       });

//       this.socket.on("connect_error", (err) => {
//         throw new Error("errs");
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

// export default socketService;

const socketService = {
  socket: null,
  connectCallbacks: [],

  connect: function (message) {
    try {
      console.log("adfasdf");
      this.socket = io("http://localhost:3001");

      if (!this.socket) {
        throw new Error("didnt get any socket");
      }

      this.socket.on("connect", () => {
        console.log("connected", message);
        // Call any registered connect callbacks
        this.callConnectCallbacks(); // Call the function here
      });

      this.socket.on("connect_error", (err) => {
        throw new Error("errs");
      });
    } catch (err) {
      console.log(err);
    }
  },

  // Register a callback to be called when the connection is established
  onConnect: function (callback) {
    if (this.socket && this.socket.connected) {
      // If the connection is already established, call the callback immediately
      callback();
    } else {
      // Otherwise, add the callback to the list of callbacks to be called on connect
      this.connectCallbacks.push(callback);
    }
  },

  // Helper function to call all registered connect callbacks
  callConnectCallbacks: function () {
    while (this.connectCallbacks.length) {
      const callback = this.connectCallbacks.pop();
      callback();
    }
  },
};

export default socketService;
