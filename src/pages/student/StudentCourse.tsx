import { useLoaderData } from "react-router-dom";
// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import EquipmentCard from "@/components/ui/EquipmentCard";
const StudentCourse = () => {
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
                <EquipmentCard />
                <EquipmentCard />
                <EquipmentCard />
                <EquipmentCard />
                <EquipmentCard />
                <EquipmentCard />
                <EquipmentCard />
                <EquipmentCard />
            </div>
        </div>
    );
}
export default StudentCourse;