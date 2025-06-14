import { useLoaderData } from "react-router-dom";
// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import EquipmentCard from "@/components/ui/EquipmentCard";
import { useStore } from '@/hooks/hooks';
const StudentEquipment = () => {
    const [state, dispatch] = useStore();
    const { isSidebarOpen } = state;
    return (
        <div>
            <div className="text-2xl md:text-4xl font-medium mb-4">Equipment</div>
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
            <div className={`grid grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-10 justify-items-center`}>
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
                <EquipmentCard isRequest />
            </div>
        </div>
    );
}
export default StudentEquipment;