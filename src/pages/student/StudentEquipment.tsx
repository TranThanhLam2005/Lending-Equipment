// import libraries
import { useLoaderData } from "react-router-dom";

// import components and hooks 
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import EquipmentCard from "@/components/ui/EquipmentCard";
import { useStore } from '@/hooks/hooks';
import useSearchAndFilter from "@/hooks/useSearchAndFilter";

const StudentEquipment = () => {

    const [state, dispatch] = useStore();
    const { isSidebarOpen } = state;
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
            <div className="text-2xl md:text-4xl font-medium mb-4">Equipment</div>
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
            <div className={`grid grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-10 justify-items-center`}>
                {displayData.map((item, index) => (
                    <EquipmentCard
                        key={index}
                        id={item.ID}
                        name={item.Name}
                        type={item.Type}
                        status={item.Status}
                        condition={item.Condition}
                        purchaseDate={item.PurchaseDate}
                        isRequest
                    />
                ))}
            </div>
        </div>
    );
}
export default StudentEquipment;