/**
 * StudentEquipment Page - Headless UI Pattern
 *
 * Architecture:
 * - Data & State: useEquipmentList hook (business logic)
 * - Event Handling: equipment.handlers (search, borrow, navigation)
 * - UI: EquipmentListView (pure presentation)
 *
 * Features:
 * - Equipment list with search, filter, and sort
 * - Request borrow with modal
 * - Navigate to equipment details
 */

// import libraries
import {useState} from "react";
import {useLoaderData, useNavigate} from "react-router-dom";

// import hooks and handlers
import {useStore} from "@/hooks/hooks";
import {useEquipmentList} from "@/hooks/equipment/useEquipmentList";
import {createEquipmentSearchHandlers} from "@/handlers";
import {
  createLendingModalHandlers,
  submitBorrowRequest,
  prepareBorrowModalData,
} from "@/handlers";

// import routes
import {ROUTES} from "@/api/config";

// import components
import EquipmentListView from "@/components/ui/equipment/EquipmentListView";
import LendingModal from "@/components/ui/common/LendingModal";
import LoadingPage from "@/components/ui/common/LoadingPage";
import ConfirmModal from "@/components/ui/common/ConfirmModal";

// import types
import type {Equipment, User} from "@/types/Type";

const StudentEquipment = () => {
  const [state] = useStore() as [any, any];
  const {isSidebarOpen} = state;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Equipment | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialData = useLoaderData();

  const {
    equipmentList,
    displayData,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    statusOptions,
    sortOptions,
  } = useEquipmentList({
    initialData: initialData as any[],
  });

  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  const handleViewDetails = (equipmentId: string) => {
    navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
  };

  const handleRequestBorrow = async (equipmentId: string) => {
    setIsLoadingModal(true);
    try {
      // Find the equipment from the list
      const equipment = equipmentList.find((eq) => eq.ID === equipmentId);

      if (!equipment) {
        throw new Error("Equipment not found");
      }

      const {modalData: preparedData, currentUser: userData} =
        await prepareBorrowModalData(equipment);

      setModalData(preparedData);
      setCurrentUser(userData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading borrow request data:", error);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const actionHandlers = {
    onRequestBorrow: handleRequestBorrow,
    onViewDetails: handleViewDetails,
  };

  const closeLendingModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setCurrentUser(null);
  };

  const handleSuccess = () => {
    setShowSuccessModal(true);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const handleErrorConfirm = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  // Create lending modal handlers
  const lendingModalHandlers =
    modalData && currentUser
      ? createLendingModalHandlers(
          submitBorrowRequest,
          modalData,
          currentUser,
          closeLendingModal,
          handleSuccess,
          handleError
        )
      : null;

  return (
    <>
      {isLoadingModal && <LoadingPage />}

      <EquipmentListView
        equipmentList={displayData}
        allEquipment={equipmentList}
        isSidebarOpen={isSidebarOpen}
        filters={filters}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        searchHandlers={searchHandlers}
        actionHandlers={actionHandlers}
        isRequest={true}
        title="Equipment"
      />

      {isModalOpen && modalData && lendingModalHandlers && (
        <LendingModal
          title="Request Equipment Borrow"
          data={modalData}
          onAccept={lendingModalHandlers.onAccept}
          onCancel={lendingModalHandlers.onCancel}
        />
      )}

      {showSuccessModal && (
        <ConfirmModal
          type="confirm"
          title="Request Submitted!"
          message="Your borrow request has been submitted successfully. The page will reload to show updated information."
          onConfirm={handleSuccessConfirm}
          singleButton={true}
        />
      )}

      {showErrorModal && (
        <ConfirmModal
          type="delete"
          title="Request Failed"
          message={
            errorMessage || "Failed to submit borrow request. Please try again."
          }
          onConfirm={handleErrorConfirm}
          singleButton={true}
        />
      )}
    </>
  );
};

export default StudentEquipment;
