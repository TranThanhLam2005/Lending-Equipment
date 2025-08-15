// import libraries
import { useState, memo } from "react";
import { useLoaderData } from "react-router-dom";
import { format, parseISO } from 'date-fns';

// import components
import { useStore } from '@/hooks/hooks';
import ChatBox from "@/components/ui/ChatBox";
import LendingModal from "@/components/ui/LendingModal";
import { Button } from "@/components/ui/Button";

// import icons
import { CalendarDays, MapPin, Info, Home, Monitor, Wrench, CheckCircle } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";



const EquipmentDetail = () => {
  const [searchOrder, setSearchOrder] = useState("Default");
  const [state, dispatch] = useStore();
  const [isLendingModalOpen, setIsLendingModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { isSidebarOpen } = state;

  const { equipment, user } = useLoaderData() as { equipment: any };
  const formatPurchaseDate = format(parseISO(equipment.PurchaseDate), 'EEEE, MMMM dd, yyyy');
  const formatAvailableDate = format(parseISO(equipment.DateAvailable), 'EEEE, MMMM dd, yyyy');

  return (
    <div>
      <div className="text-2xl md:text-4xl font-medium mb-6 md:mb-4">{equipment.Name}</div>
      <div className="flex md:flex-row flex-col items-start rounded-sm shadow-sm bg-white">
        <div className="border-r border-gray-200 mb-4 md:mr-4 md:mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBbQ5tc4F35cTBlYWIIWxfLoDupmR00CG5fQ&s"
            alt="Equipment"
            className="w-screen h-[240px] md:w-[500px] md:h-[290px] rounded-tl-sm md:rounded-bl-sm rounded-tr-sm md:rounded-tr-none  shadow-lg" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-2 border-b pb-3 md:block hidden">Equipment Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4  gap-x-2 gap-y-3 text-sm text-[#475467] md:pb-2 p-3 md:p-0">
            <DetailInfo
              icon={Home}
              label="Equipment ID:"
              info={equipment.ID}
            />
            <DetailInfo
              icon={CalendarDays}
              label="Purchase Date:"
              info={formatPurchaseDate}
              className="md:block hidden"
            />
            <DetailInfo
              icon={Monitor}
              label="Equipment Type:"
              info={equipment.Type}
            />
            <DetailInfo
              icon={Wrench}
              label="Condition:"
              info={equipment.Condition}
            />
            <DetailInfo
              icon={CalendarDays}
              label="Date Available:"
              info={formatAvailableDate}
            />
            <DetailInfo
              icon={CheckCircle}
              label="Status:"
              info={equipment.Status}
            />
            <DetailInfo
              icon={MapPin}
              label="Take it in"
              info={equipment.Venue}
            />
          </div>
          <div className="w-full text-sm text-[#475467] border-t py-2">
            <DetailInfo
              icon={Info}
              label="Description:"
              info={equipment.Description}
              className="md:block hidden"
            />
          </div>
          <div className="flex justify-end mr-2 mb-3 md:mb-0">
            <Button variant="primary" size="medium" onClick={() => setIsLendingModalOpen(true)}>
              Request
            </Button>
          </div>
        </div>
      </div>
      <div className="text-xl md:text-3xl font-medium my-6 md:my-4">Comment</div>
      <div>
        <ChatBox equipmentId={equipment.ID} commentHistory={equipment.historyComments} user={user} />
      </div>


      {isLendingModalOpen && (
        <LendingModal
          title="Lending Request"
          data={equipment}
          onAccept={() => {
            setIsLendingModalOpen(false);
            setIsConfirmModalOpen(true);
          }}
          onCancel={() => setIsLendingModalOpen(false)}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          type = "confirm"
          title="Confirm Lending Request"
          message="Are you sure you want to send this lending request?"
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            // Handle the lending request confirmation logic here
          }}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
}
const DetailInfo = memo(({ icon: Icon, label, info, className = "" }) => (
  <div className={`space-x-2 ${className}`}>
    <div className="flex items-center">
      <Icon size={24} className="flex-shrink-0" />
      <div className="flex flex-col items-start ml-2">
        <div>{label}</div>
        <div className="line-clamp-2">{info}</div>
      </div>
    </div>
  </div>
));

export default EquipmentDetail;