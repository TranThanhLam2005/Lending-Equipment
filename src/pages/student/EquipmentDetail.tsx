// import libraries
import { useState } from "react";
import { format, parseISO } from 'date-fns';

// import components
import { useStore } from '@/hooks/hooks';
import EquipmentCard from "@/components/ui/EquipmentCard";
import ChatBox from "@/components/ui/ChatBox";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";

// import icons
import { CalendarDays, MapPin, Info, Home, Monitor, Wrench, CheckCircle, Eye } from "lucide-react";


const sortItems = [
  { text: "Default" },
  { text: "Most Recent" },
  { text: "Oldest" },
];
const EquipmentDetail = () => {
  const [searchOrder, setSearchOrder] = useState("Default");
  const [state, dispatch] = useStore();
  const { isSidebarOpen } = state;

  // const  { course: any };
  // const formattedDateEnd = format(parseISO( 'dd MMMM yyyy');

  return (
    <div>
      <div className="text-2xl md:text-4xl font-medium mb-6 md:mb-4">AVR Headset</div>
      <div className="flex md:flex-row flex-col items-start md:space-x-4 rounded-sm shadow-sm bg-white">
        <div className="border-r border-gray-200 mb-4 md:mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBbQ5tc4F35cTBlYWIIWxfLoDupmR00CG5fQ&s"
            alt="Equipment"
            className="w-screen h-[240px] md:w-[500px] md:h-[278px] md:rounded-tl-sm md:rounded-bl-sm  shadow-lg" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-2 border-b pb-3 md:block hidden">Equipment Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4  gap-x-2 gap-y-3 text-sm text--[#475467] md:pb-2 p-3 md:p-0">
            {DetailInfo({
              icon: Home,
              label: "Equipment ID:",
              info: "EQ-123456"
            })}
            {
              DetailInfo({
                icon: CalendarDays,
                label: "Purchase Date:",
                info: "20 January 2023",
                className: "md:block hidden"
              })
            }
            {DetailInfo({
              icon: Monitor,
              label: "Equipment Type:",
              info: "VR Headset"
            })}
            {DetailInfo({
              icon: Wrench,
              label: "Condition:",
              info: "Good"
            })}

            {DetailInfo({
              icon: CalendarDays,
              label: "Date Available:",
              info: "20 January 2023"
            })}
            {DetailInfo({
              icon: CheckCircle,
              label: "Status:",
              info: "Available"
            })}
            {DetailInfo({
              icon: MapPin,
              label: "Take it in",
              info: "Room 101",
            })}
          </div>
          <div className="w-full text-sm text--[#475467] border-t py-2">
            {DetailInfo({
              icon: Info,
              label: "Description:",
              info: "This is a high-quality VR headset suitable for immersive experiences suitable suitable for immersive experiences suitable suitable for immersive experiences suitable for immersive experiences  in virtual reality environments. It features advanced tracking technology and comfortable design for extended use.",
              className: "md:block hidden"
            })}
          </div>
          <div className="flex justify-end mr-2 mb-3 md:mb-0">
            <Button variant="primary" size="medium">
              Request
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between my-6 md:my-4">
        <div className="text-xl md:text-3xl font-medium ">Comment</div>
        <Dropdown
          value={searchOrder}
          placeholder="Order Comment by:"
          items={sortItems}
          valueSetter={setSearchOrder}
        />
      </div>
      <div>
        <ChatBox />
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

export default EquipmentDetail;