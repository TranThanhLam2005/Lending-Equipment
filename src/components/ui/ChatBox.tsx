import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Comment from './Comment';
import Input from './Input';

// 🔗 Replace with your actual server URL
const socket = io("http://192.168.1.127:3001", {
    withCredentials: true, // if you're using cookies/session
});



const ChatBox = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Join a group or room
        socket.emit('join-room', 'GRP001');

        // Listen for incoming messages
        socket.on('chat-message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        // Clean up socket on unmount
        return () => {
            socket.off('chat-message');
        };
    }, []);
    const handleSendMessage = (content) => {
        if (content.trim()) {
            socket.emit('chat-message', {
                groupId,
                citizenId,
                content,
            });
        }
    };
    return (
        <div className="flex flex-col gap-y-6 bg-white rounded-lg shadow-lg p-2 ">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Input
                type="text"
                placeholder="Type your message here..."
                inbox
                onSend={handleSendMessage}
            />
        </div>
    );
}

export default ChatBox;