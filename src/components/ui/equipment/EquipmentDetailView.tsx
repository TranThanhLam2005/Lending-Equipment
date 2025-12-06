/**
 * Pure presentational component for equipment detail page
 * All data and handlers passed as props
 */

import {format, parseISO} from "date-fns";
import {Button} from "@/components/ui/common/Button";
import DetailInfo from "@/components/ui/common/DetailInfo";
import ChatBox from "@/components/ui/common/ChatBox";
import LendingModal from "@/components/ui/common/LendingModal";
import ConfirmModal from "@/components/ui/common/ConfirmModal";

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
    <div className="px-3 sm:px-4 md:px-6 lg:px-0">
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 sm:mb-5 md:mb-6">
        {equipment.Name}
      </div>

      <div className="flex flex-col lg:flex-row items-start rounded-lg shadow-md bg-white overflow-hidden">
        <div className="w-full lg:w-auto lg:border-r border-gray-200">
          <img
            src={imageUrl}
            alt={equipment.Name}
            className="w-full h-[200px] sm:h-[280px] md:h-[320px] lg:w-[450px] xl:w-[500px] lg:h-[340px] object-cover"
          />
        </div>

        <div className="flex-1 w-full p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 border-b border-gray-200 pb-3 hidden sm:block">
            Equipment Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-4 sm:gap-y-5 mb-5">
            <DetailInfo icon={Home} label="Equipment ID" info={equipment.ID} />
            <DetailInfo
              icon={CalendarDays}
              label="Purchase Date"
              info={formatPurchaseDate}
            />
            <DetailInfo
              icon={Monitor}
              label="Equipment Type"
              info={equipment.Type}
            />
            <DetailInfo
              icon={Wrench}
              label="Condition"
              info={equipment.Condition}
            />
            <DetailInfo
              icon={CalendarDays}
              label="Date Available"
              info={formatAvailableDate}
            />
            <DetailInfo
              icon={CheckCircle}
              label="Status"
              info={equipment.Status}
            />
            <DetailInfo
              icon={MapPin}
              label="Venue"
              info={equipment.Venue || "N/A"}
            />
          </div>

          <div className="w-full text-sm text-[#475467] border-t border-gray-200 pt-4 mb-5">
            <DetailInfo
              icon={Info}
              label="Description"
              info={equipment.Description || "No description available"}
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="medium"
              onClick={onOpenLendingModal}
              className="w-full sm:w-auto"
            >
              Request Equipment
            </Button>
          </div>
        </div>
      </div>

      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-6 sm:mt-8 mb-4 sm:mb-5">
        Comments
      </div>
      <div className="mb-6">
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
