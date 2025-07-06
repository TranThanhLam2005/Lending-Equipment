const LoadingPage  = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
            <div className="text-center text-gray-500">Loading...</div>
        </div>
    );
    }
export default LoadingPage;