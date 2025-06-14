import { useLoaderData } from "react-router-dom";
// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import EquipmentCard from "@/components/ui/EquipmentCard";

const Visitor = () => {
    const data = useLoaderData() as { equipment: any[] };
    return (
        <div className="p-4 bg-gray-100">
            <div className="flex justify-between mb-4">
                <div className="flex space-x-4">
                    <div className="hidden md:block">
                        <Input
                            placeholder="Search Equipment..."
                            type="text"
                            search
                        />
                    </div>
                    <Dropdown options={['Default', 'Most Recent', 'Oldest']} />
                </div>
                <Dropdown options={['Default', 'Most Recent', 'Oldest']} labeled />
            </div>
            <div className="md:hidden block mb-4">
                <Input
                    placeholder="Search Equipment..."
                    type="text"
                    search
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 justify-items-center">
                {data.map((item, index) => (
                    <EquipmentCard
                        key={item.index}
                        name={item.Name}
                        type = {item.Type}
                        status = {item.Status}
                        condition = {item.Condition}
                        purchaseDate = {item.PurchaseDate}
                    />
                ))}
            </div>
        </div>
    );
}

export default Visitor;
