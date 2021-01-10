import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link,  } from 'react-router-dom';
import axios from '../axios';
import '../sidebarchat.css';

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [] );

    const createChat = async () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            // do stuff
            await axios.post('/rooms/create', {
                name: roomName,
            });
        }
    };

    
    useEffect(() => {

    },[id])

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat-info">
                    <h2>{name}</h2>
                    <p></p>
                </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;