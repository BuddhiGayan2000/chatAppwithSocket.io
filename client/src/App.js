import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room);
    }
  }

  const sendMessage = () => {
    socket.emit("send-message", { message, room });
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input placeholder="Room no" onChange={(event) => {
        setRoom(event.target.value);
      }}></input>
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="message"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
