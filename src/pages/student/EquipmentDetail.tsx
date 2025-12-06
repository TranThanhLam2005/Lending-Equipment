/**
 * EquipmentDetail Page - Headless UI Pattern
 * Demonstrates separation of concerns:
 * - Data fetching: useEquipmentDetail hook
 * - Event handling: Modal and action handlers
 * - UI rendering: EquipmentDetailView component
 */

// import libraries
import {useLoaderData} from "react-router-dom";

// import hooks
import {useEquipmentDetail} from "@/hooks/useEquipmentDetail";

// import components
import EquipmentDetailView from "@/components/ui/EquipmentDetailView";
import LoadingPage from "@/components/ui/LoadingPage";

const EquipmentDetail = () => {
  // Load initial data from route loader
  const loaderData = useLoaderData() as {equipment: any; user: any};

  // Use headless hook for business logic and state management
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

  // Handle confirm borrow action
  const handleConfirmBorrow = async () => {
    try {
      // TODO: Collect borrow data from lending modal
      const borrowData = {
        equipmentId: equipment?.ID,
        // Add other necessary fields
      };

      await requestBorrow(borrowData);
      closeConfirmModal();

      // Show success message (you can add a toast notification here)
      console.log("Borrow request submitted successfully");
    } catch (err) {
      console.error("Failed to submit borrow request:", err);
      // Handle error (you can add error notification here)
    }
  };

  // Show loading state
  if (isLoading && !equipment) {
    return <LoadingPage />;
  }

  // Show error state
  if (error || !equipment || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          {error || "Failed to load equipment details"}
        </p>
      </div>
    );
  }

  // Render pure presentational component
  return (
    <EquipmentDetailView
      equipment={equipment}
      user={user}
      isLendingModalOpen={isLendingModalOpen}
      isConfirmModalOpen={isConfirmModalOpen}
      onOpenLendingModal={openLendingModal}
      onCloseLendingModal={closeLendingModal}
      onOpenConfirmModal={openConfirmModal}
      onCloseConfirmModal={closeConfirmModal}
      onConfirmBorrow={handleConfirmBorrow}
    />
  );
};

export default EquipmentDetail;
