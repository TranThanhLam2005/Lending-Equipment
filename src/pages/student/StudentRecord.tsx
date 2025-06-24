// import libraries
import { useLoaderData } from "react-router-dom";

// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import useSearchAndFilter from "@/hooks/useSearchAndFilter";

// import icons
import { Trash, AlertTriangle, CornerUpLeft } from 'lucide-react';

const StudentRecord = () => {
    const data = useLoaderData();

    const {
        searchTerm,
        setSearchTerm,
        searchStatus,
        setSearchStatus,
        searchOrder,
        setSearchOrder,
        displayData,
        statusItems,
        sortItems
    } = useSearchAndFilter({
        data: data,
        path: "user/query_participant_equipment"
    });
    return (
        <div>
            <div className="text-2xl md:text-4xl font-medium mb-4">Lending Record</div>
            <div className="flex justify-between mb-4">
                <div className="flex space-x-4">
                    <div className="hidden md:block">
                    <Input
                            placeholder="Search Equipment..."
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            search
                        />
                    </div>
                    <Dropdown
                        value={searchStatus}
                        placeholder="Order events by:"
                        items={statusItems}
                        valueSetter={setSearchStatus}
                    />
                </div>
                <Dropdown
                    value={searchOrder}
                    placeholder="Order events by:"
                    items={sortItems}
                    valueSetter={setSearchOrder}
                />
            </div>
            <div className="md:hidden block mb-4">
                <Input
                    placeholder="Search Equipment..."
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    search
                />
            </div>

            {/* Events Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Equipment
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Supervisor
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Borrowed Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Return Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Laptop</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-01</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-15</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800 font-bold">Borrowed</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <CornerUpLeft className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            {/* More rows can be added here */}
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Projector</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-05</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-bold">Returned</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Trash className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            {/* More rows can be added here */}
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Projector</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-05</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-1 py-1 rounded-sm text-white bg-red-600">Overdue</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <AlertTriangle className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Laptop</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-01</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-15</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800 font-bold">Borrowed</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <CornerUpLeft className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            {/* More rows can be added here */}
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Projector</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-05</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-bold">Returned</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Trash className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            {/* More rows can be added here */}
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Projector</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-05</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-1 py-1 rounded-sm text-white bg-red-600">Overdue</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <AlertTriangle className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            {/* More rows can be added here */}
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Projector</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-05</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-1 py-1 rounded-sm text-white bg-red-600">Overdue</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <AlertTriangle className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                            {/* More rows can be added here */}
                            <tr className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Projector</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-05</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-1 py-1 rounded-sm text-white bg-red-600">Overdue</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <AlertTriangle className="w-9 h-9 cursor-pointer" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default StudentRecord;