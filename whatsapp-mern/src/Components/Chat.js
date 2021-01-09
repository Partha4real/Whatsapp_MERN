import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons';
import React, { useState } from 'react';
import '../chat.css';

function Chat() {
    const [input, setInput] = useState('');

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
                <p className="chat-message">
                    <span className="chat-name">Sainy</span>
                    This is a message
                    <span className="chat-timestamp">{new Date().toUTCString()}</span>
                </p>

                <p className="chat-message chat-receiver">
                    <span className="chat-name">Partha</span>
                    This is a message
                    <span className="chat-timestamp">{new Date().toUTCString()}</span>
                </p>
            </div>
            <div className="chat-footer">
                <InsertEmoticon />
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
                    <button id="form-btn-submit" type="submit" onClick="{sendMessage">Send Message</button>
                </form>
                <Mic />
            </div>
        </div>
    );
}

export default Chat;