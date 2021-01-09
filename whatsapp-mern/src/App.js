import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      // console.log(response.data);
      setMessages(response.data)
    })
  }, [])

  console.log(messages);

  useEffect(() => {
    const pusher = new Pusher('cfbecf8435342e494078', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });
    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat  messages={messages} />
      </div>
    </div>
  );
}

export default App;
