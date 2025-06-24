const Notification = () => {
    return (
        <div className="flex items-center space-x-2 bg-white max-h-24">
            <div className="flex-shrink-0">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/250px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                    className="w-12 h-12 rounded-full"
                />
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-500 line-clamp-2">
                    <span className="font-semibold text-gray-800">
                        Tran Thanh Lam {""}
                    </span>
                    require you to accept the request for the AVR headset from the in Introduction to engineering courses.
                </p>
                <span className="text-xs text-gray-400">2 minutes ago</span>
            </div>
        </div>
    )
}

export default Notification;