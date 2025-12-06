/**
 * StudentEquipment Page - Headless UI Pattern
 * Demonstrates separation of concerns:
 * - Data fetching: useEquipmentList hook
 * - Event handling: createEquipmentSearchHandlers
 * - UI rendering: EquipmentListView component
 */

// import libraries
import {useLoaderData, useNavigate} from "react-router-dom";

// import hooks and handlers
import {useStore} from "@/hooks/hooks";
import {useEquipmentList} from "@/hooks/equipment/useEquipmentList";
import {createEquipmentSearchHandlers} from "@/handlers";

// import routes
import {ROUTES} from "@/api/config";

// import components
import EquipmentListView from "@/components/ui/equipment/EquipmentListView";

const StudentEquipment = () => {
  const [state] = useStore() as [any, any];
  const {isSidebarOpen} = state;
  const navigate = useNavigate();

  // Load initial data from route loader
  const initialData = useLoaderData();

  // Use headless hook for business logic and state management
  const {
    equipmentList,
    displayData,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    statusOptions,
    sortOptions,
    error,
  } = useEquipmentList({
    initialData: initialData as any[],
  });

  // Create event handlers
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // Handle navigation to detail page
  const handleViewDetails = (equipmentId: string) => {
    navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
  };

  const handleRequestBorrow = (equipmentId: string) => {
    // Navigate to detail page where user can request borrow
    navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
  };

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  // Render pure presentational component
  return (
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
  );
};

export default StudentEquipment;
