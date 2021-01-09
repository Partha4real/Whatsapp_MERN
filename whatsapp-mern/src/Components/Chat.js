import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons';
import React, { useState } from 'react';
import axios from '../axios';
import '../chat.css';

function Chat({messages}) {
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Adi",
            timestamp: "Just Now",
            received: false
        });
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar />

                <div className="chat-headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at</p>
                </div>

                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message) => (
                    <p className={`chat-message ${message.received && 'chat-receiver'}`}>
                        <span className="chat-name">{message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">{message.timestamp}</span>
                    </p>
                ))}
                
            </div>
            <div className="chat-footer">
                <InsertEmoticon />
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <Mic />
            </div>
        </div>
    );
}

export default Chat;