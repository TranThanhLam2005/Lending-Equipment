/**
 * StudentRecord Page - Headless UI Architecture
 * Displays user's lending records with search, filter, and action capabilities
 * Uses headless UI pattern: separated business logic, handlers, and presentation
 */

import {useLoaderData, useNavigate} from "react-router-dom";
import {useLendingRecords} from "@/hooks/lending/useLendingRecords";
import {
  createLendingRecordSearchHandlers,
  createLendingRecordActionHandlers,
} from "@/handlers/lending.handlers";
import LendingRecordListView from "@/components/ui/lending/LendingRecordListView";
import type {LendingRecord} from "@/types/Type";

const StudentRecord = () => {
  const loaderData = useLoaderData() as LendingRecord[] | null;
  const navigate = useNavigate();

  // Headless hook - manages state and business logic
  const {
    records,
    allRecords,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    setRecords,
    statusOptions,
    sortOptions,
  } = useLendingRecords({
    initialData: loaderData || [],
  });

  // Search handlers - separated from UI
  const searchHandlers = createLendingRecordSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // Action handlers - separated from UI
  const handleReturnEquipment = async (recordId: string) => {
    try {
      // TODO: Implement API call when backend is ready
      // await lendingService.returnEquipment(recordId);
      console.log("Return equipment:", recordId);

      // Update local state after successful return
      setRecords((prev) =>
        prev.map((record) =>
          record.ID === recordId ? {...record, Status: "Returned"} : record
        )
      );
    } catch (error) {
      console.error("Failed to return equipment:", error);
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    try {
      // TODO: Implement API call when backend is ready
      // await lendingService.deleteLendingRecord(recordId);
      console.log("Delete record:", recordId);

      // Remove from local state after successful deletion
      setRecords((prev) => prev.filter((record) => record.ID !== recordId));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  const actionHandlers = createLendingRecordActionHandlers(
    navigate,
    handleReturnEquipment,
    handleDeleteRecord
  );

  // Pure presentational component with all logic extracted
  return (
    <LendingRecordListView
      records={records}
      allRecords={allRecords}
      filters={filters}
      statusOptions={statusOptions}
      sortOptions={sortOptions}
      searchHandlers={searchHandlers}
      actionHandlers={actionHandlers}
      title="Lending Record"
      showStatistics={true}
    />
  );
};

export default StudentRecord;
