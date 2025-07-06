// import libraries
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { format, parseISO } from 'date-fns';

// import components
import EquipmentCard from "@/components/ui/EquipmentCard";
import { useStore } from '@/hooks/hooks';

// import icons
import { CalendarDays, MapPin, Info, User2, Home } from "lucide-react";


const MyCourseDetail = () => {
    const data = useLoaderData() as { course: any };
    const [searchOrder, setSearchOrder] = useState("Default");
    const [state, dispatch] = useStore();
    const { isSidebarOpen } = state;

    const formattedDateEnd = format(parseISO(data.DateEnd), 'dd MMMM yyyy');

    return (
        <div>
            <div className="text-2xl md:text-4xl font-medium mb-6 md:mb-4">{data.CourseName}</div>
            <div className="flex md:flex-row flex-col items-start md:space-x-4 rounded-sm shadow-sm">
                <div className="border-r border-gray-200 mb-4 md:mb-0">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D5603AQEe4ZoLQ3_cbA/profile-displayphoto-shrink_200_200/B56ZbFRglsGsAY-/0/1747066424476?e=2147483647&v=beta&t=dtj7XdWmVigvP5yXH-uSyEDj6h3VRJhh0rFD2vNbNBM"
                        alt="Equipment"
                        className="w-screen h-[240px] md:w-[500px] md:h-[278px] md:rounded-tl-sm md:rounded-bl-sm  shadow-lg" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl mb-2 border-b pb-3 md:block hidden">Course Information</h2>
                    <div className="grid grid-cols-2 gap-y-5 text-sm text--[#475467] pb-3">
                        {DetailInfo({
                            icon: Home,
                            label: "ID:",
                            info: data.CourseID
                        })}
                        {DetailInfo({
                            icon: User2,
                            label: "Staff:",
                            info: data.AcademicStaffName
                        })}

                        {DetailInfo({
                            icon: CalendarDays,
                            label: "Date End:",
                            info: formattedDateEnd
                        })}

                        {DetailInfo({
                            icon: Info,
                            label: "Description:",
                            info: data.Description,
                            className: "md:block hidden"
                        })}

                        {DetailInfo({
                            icon: MapPin,
                            label: "Room:",
                            info: data.Room
                        })}

                        {DetailInfo({
                            icon: CalendarDays,
                            label: "Lecture Date:",
                            info: data.LectureDate
                        })}
                    </div>
                </div>
            </div>

            <div className="text-xl md:text-3xl my-6 md:my-4 font-medium ">Related Equipment</div>

            <div className={`grid grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-10 justify-items-center`}>
                {data.Equipments.map((item, index) => (
                    <EquipmentCard
                        key={index}
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
const DetailInfo = ({ icon: Icon, label, info, className = "" }) => {
    return (
        <div className={`space-x-2 ${className}`}>
            <div className="flex items-center ">
                <Icon size={24} className="flex-shrink-0" />
                <div className="flex flex-col items-start ml-2">
                    <div>{label}</div>
                    <div className="line-clamp-2">{info}</div>
                </div>
            </div>
        </div>
    );
}

export default MyCourseDetail;