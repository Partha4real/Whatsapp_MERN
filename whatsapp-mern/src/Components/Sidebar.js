import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, MoreVert, Chat, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from '../axios';
import '../sidebar.css';
import SidebarChat from './SidebarChat';
import { useStateValue } from '../StateProvider';

function Sidebar() {
    const [rooms, setRoom] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
      axios.get('/rooms/fetch')
      .then(response => {
        // console.log(response.data);
        setRoom(response.data)
    })
    }, [])
  
    console.log(rooms);
  
    useEffect(() => {
      const pusher = new Pusher('cfbecf8435342e494078', {
        cluster: 'ap2'
      });
  
      const channel = pusher.subscribe('rooms');
      channel.bind('created', (newRoom) => {
        setRoom([...rooms, newRoom])
      });
      return () =>{
        channel.unbind_all();
        channel.unsubscribe();
      }
    }, [rooms])

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar src={user.photoURL} />
                <div className="sidebar-headerRight">
                    <IconButton>  {/* Click functionality */}   
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or Start new Chat" type="text" />
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat addNewChat/>
                {rooms.map((room) => (
                    <SidebarChat key={room._id} id={room._id} name={room.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;