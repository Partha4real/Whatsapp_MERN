import { Avatar } from '@material-ui/core';
import React from 'react';
import '../sidebarchat.css'
function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat-info">
                <h2>Room name</h2>
                <p>Last message sent</p>
            </div>
        </div>
    );
}

export default SidebarChat;