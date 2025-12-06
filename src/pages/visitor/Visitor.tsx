/**
 * Visitor Page - Headless UI Pattern
 * Public equipment viewing page without authentication
 * Uses useEquipmentList hook with visitor mode enabled
 */

// import libraries
import {useLoaderData} from "react-router-dom";

// import hooks and handlers
import {useEquipmentList} from "@/hooks/useEquipmentList";
import {createEquipmentSearchHandlers} from "@/handlers";

// import components
import EquipmentListView from "@/components/ui/EquipmentListView";

const Visitor = () => {
  // Load initial data from route loader
  const initialData = useLoaderData();
  console.log("Visitor initial data:", initialData);

  // Use headless hook with visitor mode enabled
  const {
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
    isVisitor: true, // Use visitor endpoint for queries
  });

  // Create event handlers
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // Visitor mode has no borrow or detail view actions
  const handleViewDetails = (equipmentId: string) => {
    console.log("View details:", equipmentId);
    // Could navigate to a public detail page if needed
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <EquipmentListView
        equipmentList={displayData}
        searchTerm={filters.searchTerm}
        searchStatus={filters.searchStatus}
        searchOrder={filters.searchOrder}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        onSearchChange={searchHandlers.onSearchChange}
        onStatusChange={searchHandlers.onStatusChange}
        onSortChange={searchHandlers.onSortChange}
        onViewDetails={handleViewDetails}
        isRequest={false} // Hide borrow actions for visitors
        title="Available Equipment"
      />
    </div>
  );
};

export default Visitor;
