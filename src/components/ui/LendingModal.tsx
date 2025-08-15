// import libraries
import { useState } from "react";

// import components
import { Button } from "@/components/ui/Button";

// import icons
import { ClipboardList } from "lucide-react";


const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
};

interface LendingModalProps {
    title: string;
    data: object;
    onAccept: () => void;
    onCancel: () => void;
}



const LendingModal = (
    { title, data, onAccept, onCancel }: LendingModalProps
) => {
    const [purpose, setPurpose] = useState("");
    return (
        <div className="fixed inset-0 backdrop-blur-md z-[9999]" onClick={onCancel}>
            <div
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-auto mt-20"
                onClick={handlePropagation}
            >
                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center justify-center text-5xl text-red-500 mb-4">
                        <ClipboardList className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <div>
                        <span>Borrower Name: </span>
                        <span className="text-base text-gray-600 mt-2 text-center">{data.CurrentUserName}</span>
                    </div>
                    <div>
                        <span>Supervisor Name: </span>
                        <span className="text-base text-gray-600 mt-2 text-center">{data.AcademicStaffName}</span>
                    </div>
                    <div>
                        <span>Equipment: </span>
                        <span className="text-base text-gray-600 mt-2 text-center">{data.Name}</span>
                    </div>
                    <div>
                        <span>Borrower Date: </span>
                        <span className="text-base text-gray-600 mt-2 text-center">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span>Purpose: </span>
                        <input
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your purpose..."
                        />
                    </div>

                </div>
                <div className="flex justify-center mt-2">
                    <Button variant="secondary" className="mr-2" onClick={onCancel}>
                        Close
                    </Button>
                    <Button
                        className="ml-2 bg-red-500 text-white hover:bg-red-700 hover:scale-105  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        onClick={onAccept}
                    >
                        Oke
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default LendingModal;