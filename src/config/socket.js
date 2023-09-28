import io from "socket.io-client";

const socketService = {
  socket: null,
  connectCallbacks: [],

  connect: function (isManualRoom) {
    try {
      if (isManualRoom) this.socket = io("http://localhost:3001/manual-rooms");
      else this.socket = io("http://localhost:3001");

      if (!this.socket) {
        throw new Error("didnt get any socket");
      }

      this.socket.on("connect", () => {
        console.log("connected", isManualRoom);
        // Call any registered connect callbacks

        this.callConnectCallbacks(); // Call the function here
      });

      this.socket.on("connect_error", (err) => {
        console.log(err);
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
