import Comment from './Comment';
import Input from './Input';

const ChatBox = () => {
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
            />
        </div>
    );
}

export default ChatBox;