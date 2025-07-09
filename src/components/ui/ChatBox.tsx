// import libraries
import { useState, useEffect, useMemo, memo } from 'react';

// import components
import Comment from './Comment';
import Input from './Input';
import { socket } from '@/utils/socket';

const ChatBox = memo(({ equipmentId, commentHistory, user }) => {
    const historyComments = useMemo(() => {
        return commentHistory.map(comment => ({
            content: comment.content,
            groupID: equipmentId,
            createAt: comment.createAt,
            sender: {
                username: comment.userName,
                fullName: comment.fullName,
                role: comment.role,
            }
        }));
    }, [commentHistory, equipmentId]);

    const [messages, setMessages] = useState<{
        content: string;
        groupID: string;
        createAt: string;
        sender?: {
            username: string;
            fullName: string;
            role: string;
        };
    }[]>(historyComments);

    useEffect(() => {
        socket.connect();

        // Join the equipment-specific room
        socket.emit('join-room', equipmentId);

        // Listen for messages
        socket.on('receive-message', (msg) => {
            return setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Clean up on unmount
        return () => {
            socket.off('receive-message', equipmentId);
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = (msg) => {
        if (msg.trim() && user) {
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
                        username: user.Username,
                        fullName: user.FullName,
                        role: user.Role
                    }
                },
            ]);
        }
    };

    return (
        <div className="flex flex-col gap-y-6 md:gap-y-4 bg-white rounded-lg shadow-lg px-4 py-2">
            {messages.map((msg, index) => {
                const isMine = msg.sender?.username === user?.Username;
                return <Comment key={index} message={msg} isMine={isMine} />;
            })}
            <Input
                type="text"
                placeholder="Type your message here..."
                inbox
                onSend={handleSendMessage}
            />
        </div>
    );
});

export default ChatBox;
