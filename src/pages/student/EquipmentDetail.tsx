/**
 * EquipmentDetail Page
 *
 * Implements Headless UI Pattern:
 * - Data fetching & state: useEquipmentDetail hook
 * - Business logic: Local handlers for modal flow
 * - Presentation: EquipmentDetailView component
 *
 * Flow:
 * 1. User clicks "Request Borrow" → Opens LendingModal
 * 2. User enters purpose → handleLendingModalAccept stores purpose
 * 3. LendingModal closes → ConfirmModal opens
 * 4. User confirms → handleBorrowConfirmation submits request
 */

// import libraries
import {useLoaderData} from "react-router-dom";
import {useRef} from "react";

// import hooks
import {useEquipmentDetail} from "@/hooks/equipment/useEquipmentDetail";

// import components
import EquipmentDetailView from "@/components/ui/equipment/EquipmentDetailView";
import LoadingPage from "@/components/ui/common/LoadingPage";

/**
 * EquipmentDetail Page Component
 */
const EquipmentDetail = () => {
  // ============================================================================
  // DATA LOADING
  // ============================================================================
  const loaderData = useLoaderData() as {equipment: any; user: any};

  // ============================================================================
  // HOOKS - Equipment data and modal state management
  // ============================================================================
  const {
    equipment,
    user,
    isLoading,
    error,
    isLendingModalOpen,
    isConfirmModalOpen,
    openLendingModal,
    closeLendingModal,
    openConfirmModal,
    closeConfirmModal,
    requestBorrow,
  } = useEquipmentDetail({
    equipmentId: loaderData.equipment?.ID,
    initialEquipment: loaderData.equipment,
    initialUser: loaderData.user,
  });

  // ============================================================================
  // STATE - Purpose storage across renders and modal transitions
  // ============================================================================
  const lendingPurposeRef = useRef("");

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle lending modal acceptance
   * Stores purpose and transitions from LendingModal to ConfirmModal
   */
  const handleLendingModalAccept = (purpose: string) => {
    lendingPurposeRef.current = purpose;
    closeLendingModal();
    openConfirmModal();
  };

  /**
   * Handle borrow confirmation
   * Submits lending request with all required data
   */
  const handleBorrowConfirmation = async () => {
    try {
      // Construct lending record data matching backend API structure
      const lendingRecordData = {
        BorrowerID: user?.CitizenID || "",
        SuperviseID: equipment?.AcademicStaffCitizenID || "",
        EquipmentID: equipment?.ID || "",
        BorrowDate: new Date().toISOString(),
        ReturnDate: new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000
        ).toISOString(), // 2 weeks from now
        Purpose: lendingPurposeRef.current,
        Status: "Pending",
      };

      // Submit lending request
      await requestBorrow(lendingRecordData);

      // Close modal and reset state
      closeConfirmModal();
      lendingPurposeRef.current = "";

      // TODO: Add success toast notification
      console.log("Lending request submitted successfully");
    } catch (err) {
      // TODO: Add error toast notification
      console.error("Failed to submit lending request:", err);
    }
  };

  // ============================================================================
  // RENDER - Loading and error states
  // ============================================================================

  if (isLoading && !equipment) {
    return <LoadingPage />;
  }

  if (error || !equipment || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          {error || "Failed to load equipment details"}
        </p>
      </div>
    );
  }

  // ============================================================================
  // RENDER - Main view with all handlers
  // ============================================================================
  return (
    <EquipmentDetailView
      equipment={equipment}
      user={user}
      isLendingModalOpen={isLendingModalOpen}
      isConfirmModalOpen={isConfirmModalOpen}
      onOpenLendingModal={openLendingModal}
      onCloseLendingModal={closeLendingModal}
      onCloseConfirmModal={closeConfirmModal}
      onConfirmBorrow={handleBorrowConfirmation}
      onAcceptLending={handleLendingModalAccept}
    />
  );
};

export default EquipmentDetail;
