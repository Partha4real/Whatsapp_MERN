import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from '../axios';
import '../chat.css';
import { useStateValue } from '../StateProvider';

function Chat({messages}) {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState({});

  const [{user}, dispatch] = useStateValue();


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId] );

    useEffect(() => {
        if (roomId) {
            axios.get(`/rooms/${roomId}`)
            .then(response => {
            setRoomName(response.data)
            })
        }
    }, [roomId])

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: user.displayName,
            received: false,
            room: roomId
        });
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat-headerInfo">
                    <h3>{roomName.name}</h3>
                    <p>{new Date(messages[messages.length - 1].createdAt).toLocaleString()} </p>
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
                    message.room === roomId && (
                        <p className={`chat-message ${message.name === user.displayName && 'chat-receiver'}`}>
                            <span className="chat-name">{message.name}</span>
                                {message.message}
                            <span className="chat-timestamp">{new Date(message.createdAt).toLocaleString()}</span>
                        </p>
                    ) 
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