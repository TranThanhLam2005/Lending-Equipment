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
import {
  createEquipmentSearchHandlers,
  prepareBorrowModalData,
  submitBorrowRequest,
} from "@/handlers";
import {createLendingModalHandlers} from "@/handlers";

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
  // ============================================================================
  // GLOBAL STATE
  // ============================================================================
  const [state] = useStore() as [any, any];
  const {isSidebarOpen} = state;
  const navigate = useNavigate();

  // ============================================================================
  // MODAL STATE
  // ============================================================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Equipment | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ============================================================================
  // DATA LOADING - Load initial data from route loader
  // ============================================================================
  const initialData = useLoaderData();

  // ============================================================================
  // HOOKS - Equipment list with search, filter, sort
  // ============================================================================
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

  // ============================================================================
  // EVENT HANDLERS - Search functionality
  // ============================================================================
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // ============================================================================
  // EVENT HANDLERS - Navigation
  // ============================================================================
  const handleViewDetails = (equipmentId: string) => {
    navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
  };

  // ============================================================================
  // EVENT HANDLERS - Borrow request flow
  // ============================================================================
  const handleRequestBorrow = async (equipmentId: string) => {
    setIsLoadingModal(true);
    try {
      const {modalData: preparedData, currentUser: userData} =
        await prepareBorrowModalData(equipmentId, equipmentList);

      setModalData(preparedData);
      setCurrentUser(userData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading borrow request data:", error);
    } finally {
      setIsLoadingModal(false);
    }
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

  // ============================================================================
  // RENDER - Main UI
  // ============================================================================
  return (
    <>
      {isLoadingModal && <LoadingPage />}

      <EquipmentListView
        equipmentList={displayData}
        allEquipment={equipmentList}
        isSidebarOpen={isSidebarOpen}
        searchTerm={filters.searchTerm}
        searchStatus={filters.searchStatus}
        searchOrder={filters.searchOrder}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        onSearchChange={searchHandlers.onSearchChange}
        onStatusChange={searchHandlers.onStatusChange}
        onSortChange={searchHandlers.onSortChange}
        onRequestBorrow={handleRequestBorrow}
        onViewDetails={handleViewDetails}
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
