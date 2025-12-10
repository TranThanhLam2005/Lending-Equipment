/**
 * EquipmentDetail Page
 *
 * Implements Headless UI Pattern:
 * - Data fetching & state: useEquipmentDetail hook
 * - Business logic: Lending modal handlers from lending.handlers.ts
 * - Presentation: EquipmentDetailView component
 *
 * Flow:
 * 1. User clicks "Request Borrow" → Opens LendingModal
 * 2. User enters purpose → Handler submits request directly
 * 3. Modal closes automatically on success
 */

// import libraries
import {useState} from "react";
import {useLoaderData} from "react-router-dom";

// import hooks
import {useEquipmentDetail} from "@/hooks/equipment/useEquipmentDetail";

// import handlers
import {createLendingModalHandlers, submitBorrowRequest} from "@/handlers";

// import components
import EquipmentDetailView from "@/components/ui/equipment/EquipmentDetailView";
import ConfirmModal from "@/components/ui/common/ConfirmModal";

/**
 * EquipmentDetail Page Component
 */
const EquipmentDetail = () => {
  const loaderData = useLoaderData() as {equipment: any; user: any};

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    equipment,
    user,
    isLendingModalOpen,
    openLendingModal,
    closeLendingModal,
  } = useEquipmentDetail({
    initialEquipment: loaderData.equipment,
    initialUser: loaderData.user,
  });

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

  const lendingModalHandlers = createLendingModalHandlers(
    submitBorrowRequest,
    equipment,
    user,
    closeLendingModal,
    handleSuccess,
    handleError
  );

  if (!equipment || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Failed to load equipment details</p>
      </div>
    );
  }

  return (
    <>
      <EquipmentDetailView
        equipment={equipment}
        user={user}
        isLendingModalOpen={isLendingModalOpen}
        onOpenLendingModal={openLendingModal}
        lendingModalHandlers={lendingModalHandlers}
      />

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

export default EquipmentDetail;
