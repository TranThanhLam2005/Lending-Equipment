// import libraries
import { useState, useEffect } from 'react';

// import components
import Comment from './Comment';
import Input from './Input';
import { socket } from '@/utils/socket';

// Define the URL for the API
const URL_API = '192.168.1.127';


const ChatBox = ({ equipmentId }) => {
    const [messages, setMessages] = useState<{
        content: string;
        groupID: string;
        createAt: string;
        sender?: {
            username: string;
            fullName: string;
            role: string;
        };
    }[]>([]);
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const fetchMyInfo = async () => {
            const res = await fetch(`http://${URL_API}:3000/user/get_user_by_session`, {
                credentials: "include",
            });
            const data = await res.json();
            setMyInfo(data);
        };
        fetchMyInfo();
        socket.connect();

        // Join the equipment-specific room
        socket.emit('join-room', equipmentId);

        // Listen for messages
        socket.on('receive-message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Clean up on unmount
        return () => {
            socket.off('receive-message', equipmentId);
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = (msg) => {
        if (msg.trim() && myInfo) {
            socket.emit("send-message", {
                content: msg,
                groupID: equipmentId,
                createAt: new Date().toISOString(),
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    content: msg,
                    groupID: equipmentId,
                    createAt: new Date().toISOString(),
                    sender: {
                        username: myInfo.Username,
                        fullName: myInfo.FullName,
                        role: myInfo.Role
                    }
                },
            ]);
        }
    };

    return (
        <div className="flex flex-col gap-y-6 bg-white rounded-lg shadow-lg p-2">
            {messages.map((msg, index) => (
                <Comment key={index} message={msg} />
            ))}
            <Input
                type="text"
                placeholder="Type your message here..."
                inbox
                onSend={handleSendMessage}
            />
        </div>
    );
};

export default ChatBox;
