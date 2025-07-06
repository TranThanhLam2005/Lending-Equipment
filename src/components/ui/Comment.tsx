// import libraries
import { format, parseISO } from 'date-fns';

// import icons
import { CalendarDays, MoreHorizontal } from 'lucide-react'


const Comment = ({message}) => {
    const formatCreateAt = format(parseISO(message.createAt), 'EEEE, MMMM dd, yyyy');

    return (
        <div className="">
            <div className="flex items-center gap-3">
                <img
                    className="w-10 h-10 rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/250px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                />
                <div>
                    <div className="font-semibold text-gray-800">
                        {message.sender.fullName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays className="inline mr-1 w-4 h-4" />
                        {formatCreateAt}
                    </div>
                </div>
                <div className="ml-auto">
                    <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                </div>
            </div>
            <div className="mt-2 text-gray-700 text-sm">
            {message.content}
            </div>
        </div>
    );
}
export default Comment;