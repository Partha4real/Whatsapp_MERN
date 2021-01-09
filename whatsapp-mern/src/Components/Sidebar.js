import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, MoreVert, Chat, SearchOutlined } from '@material-ui/icons';
import React from 'react';
import '../sidebar.css';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
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
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    );
}

export default Sidebar;