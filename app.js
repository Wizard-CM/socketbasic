const app = require("express")();
// const express = require("express");
// const app = express();
const http = require("http").Server(app);
let users = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, () => {
  console.log("Server Connected");
});

// Socket io Code
const io = require("socket.io")(http); // ( http / server instance object )

// on event run
io.on("connection", (socket) => {
  console.log("A user Connected");
  users++;
  // io.sockets.emit("broadcast", users + "Connected"); // This refers to the whole connected Clients of the server who listens the event
  // Difference
  // socket.emit("broadcast",(users+"Connected"))       // This refers to only one client who listens the event

  // Server Pre-reserverd Event ( message Event)
  // socket.send("Message Pre-reserverd Server Side Event")

  // Custom Firing Event
  // socket.emit("Custom","Hello this is a custom Event")

  io.emit("custom_Event",{data})
  socket.emit("custom_Event",{data})

  socket.on("disconnect", () => {
    users--;
    console.log("Socket Connection Disconnected");
  });
});



// io.sockets.emit("broadcast"):
// io refers to the entire Socket.IO server instance.
// This line emits the "broadcast" event to all connected clients.
//  It sends the event  to all the sockets that just connected +  to those who were connected previously and still active.

// socket.emit("broadcast"):
// socket refers to an individual client's socket/connection.
// This line emits the "broadcast" event specifically to the client (socket) that triggered the "connection" event.
//  It sends the event only to the socket that just connected not to those who were connected previously and still active.





// !! Difference Between io.sockets.emit("broadcast") and socket.broadcast.emit("broadcast") !! //

// io.sockets.emit("broadcast"):
// Sends the event to all connected clients, including the client that triggered the event.
// Useful for broadcasting information to all clients, including the sender.

// socket.broadcast.emit("broadcast"):
// Sends the event to all connected clients except the client that triggered the event.
// Useful for broadcasting information to all clients except the sender.



// !! Difference between io.emit and socket.emit !! //

// io.emit
// This method emits a message to all connected clients. When you use io.emit,
// the specified event and data will be sent to every socket that is connected to the server.
// In this case, the "custom_Event" message with the specified data will be broadcasted to all connected clients.



// !! Namespaces !! //
/*
// Code :
By default nameSpace = "/";

const nameSpace = io("/custom_nameSpace");

nameSpace.on("connection",(socket) => {
  nameSpace.emit("custom_event",data)
})

*/


// !! Rooms !! //
// => Yeuta " nameSpace " bhitra hamile afno usasge anusar multiple " channels " create garna sakchau.
// => And the process of ccreating a channel in a namespace is called Room
