// import libraries
import { useLoaderData } from "react-router-dom";

// import components and hooks
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import EquipmentCard from "@/components/ui/EquipmentCard";
import useSearchAndFilter from "@/hooks/useSearchAndFilter";


const Visitor = () => {
    const data = useLoaderData() as { equipment: any[] };

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
    } =  useSearchAndFilter({
        data: data,
        path: "visitor/query_equipment"
      });

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 justify-items-center">
                {displayData.map((item, index) => (
                    <EquipmentCard
                        key={item.index}
                        name={item.Name}
                        type={item.Type}
                        status={item.Status}
                        condition={item.Condition}
                        purchaseDate={item.PurchaseDate}
                    />
                ))}
            </div>
        </div>
    );
}

export default Visitor;
