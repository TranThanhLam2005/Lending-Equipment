// import libraries
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";


// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import EquipmentCard from "@/components/ui/EquipmentCard";



const URL_API = '192.168.1.12';

const statusItems = [
    { text: "All" },
    { text: "Available" },
    { text: "Borrowed" },
];
const sortItems = [
    { text: "Default" },
    { text: "Most Recent" },
    { text: "Oldest" },
];

const Visitor = () => {
    const data = useLoaderData() as { equipment: any[] };

    const [queryEquipmentList, setQueryEquipmentList] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchStatus, setSearchStatus] = useState("All");
    const [searchOrder, setSearchOrder] = useState("Default");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);


    useEffect(() => {
        if (debouncedSearchTerm === "" && searchStatus === "All" && searchOrder === "Default") {
            setQueryEquipmentList([]);
            return;
        }

        fetch(`http://${URL_API}:3000/visitor/query_equipment?searchValue=${debouncedSearchTerm}&searchStatus=${searchStatus}&searchOrder=${searchOrder}`)
            .then((res) => res.json())
            .then((data) => {
                setQueryEquipmentList(data);
            })
    }, [debouncedSearchTerm, searchStatus, searchOrder]);
    let displayData = [];
    if (debouncedSearchTerm != "" || searchStatus != "All" || searchOrder != "Default") {
        displayData = queryEquipmentList;
    }
    else {
        displayData = data;
    }
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
