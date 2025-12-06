/**
 * Pure presentational component for equipment detail page
 * All data and handlers passed as props
 */

import {format, parseISO} from "date-fns";
import {Button} from "@/components/ui/Button";
import DetailInfo from "@/components/ui/DetailInfo";
import ChatBox from "@/components/ui/ChatBox";
import LendingModal from "@/components/ui/LendingModal";
import ConfirmModal from "@/components/ui/ConfirmModal";

// import icons
import {
  CalendarDays,
  MapPin,
  Info,
  Home,
  Monitor,
  Wrench,
  CheckCircle,
} from "lucide-react";

export interface EquipmentDetailViewProps {
  // Equipment data
  equipment: {
    ID: string;
    Name: string;
    Type: string;
    Status: string;
    Condition: string;
    PurchaseDate: string;
    DateAvailable?: string;
    Venue?: string;
    Description?: string;
    historyComments?: any[];
  };

  // User data
  user: {
    ID: string;
    Username: string;
    Name?: string;
  };

  // Image URL
  imageUrl?: string;

  // Modal states
  isLendingModalOpen: boolean;
  isConfirmModalOpen: boolean;

  // Event handlers
  onOpenLendingModal: () => void;
  onCloseLendingModal: () => void;
  onOpenConfirmModal: () => void;
  onCloseConfirmModal: () => void;
  onConfirmBorrow: () => void;
}

const EquipmentDetailView = ({
  equipment,
  user,
  imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBbQ5tc4F35cTBlYWIIWxfLoDupmR00CG5fQ&s",
  isLendingModalOpen,
  isConfirmModalOpen,
  onOpenLendingModal,
  onCloseLendingModal,
  onOpenConfirmModal,
  onCloseConfirmModal,
  onConfirmBorrow,
}: EquipmentDetailViewProps) => {
  const formatPurchaseDate = format(
    parseISO(equipment.PurchaseDate),
    "EEEE, MMMM dd, yyyy"
  );
  const formatAvailableDate = equipment.DateAvailable
    ? format(parseISO(equipment.DateAvailable), "EEEE, MMMM dd, yyyy")
    : "N/A";

  const handleAcceptLending = () => {
    onCloseLendingModal();
    onOpenConfirmModal();
  };

  return (
    <div>
      <div className="text-2xl md:text-4xl font-medium mb-6 md:mb-4">
        {equipment.Name}
      </div>

      <div className="flex md:flex-row flex-col items-start rounded-sm shadow-sm bg-white">
        <div className="border-r border-gray-200 mb-4 md:mr-4 md:mb-0">
          <img
            src={imageUrl}
            alt={equipment.Name}
            className="w-screen h-[240px] md:w-[500px] md:h-[290px] rounded-tl-sm md:rounded-bl-sm rounded-tr-sm md:rounded-tr-none shadow-lg"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl mb-2 border-b pb-3 md:block hidden">
            Equipment Information
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3 text-sm text-[#475467] md:pb-2 p-3 md:p-0">
            <DetailInfo icon={Home} label="Equipment ID:" info={equipment.ID} />
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
              info={equipment.Venue || "N/A"}
            />
          </div>

          <div className="w-full text-sm text-[#475467] border-t py-2">
            <DetailInfo
              icon={Info}
              label="Description:"
              info={equipment.Description || "No description available"}
              className="md:block hidden"
            />
          </div>

          <div className="flex justify-end mr-2 mb-3 md:mb-0">
            <Button
              variant="primary"
              size="medium"
              onClick={onOpenLendingModal}
            >
              Request
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xl md:text-3xl font-medium my-6 md:my-4">
        Comment
      </div>
      <div>
        <ChatBox
          equipmentId={equipment.ID}
          commentHistory={equipment.historyComments || []}
          user={user}
        />
      </div>

      {isLendingModalOpen && (
        <LendingModal
          title="Lending Request"
          data={equipment}
          onAccept={handleAcceptLending}
          onCancel={onCloseLendingModal}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          type="confirm"
          title="Confirm Lending Request"
          message="Are you sure you want to send this lending request?"
          onConfirm={onConfirmBorrow}
          onCancel={onCloseConfirmModal}
        />
      )}
    </div>
  );
};

export default EquipmentDetailView;
