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
import {lendingService} from "@/api/lending.service";
import LendingRecordListView from "@/components/ui/lending/LendingRecordListView";
import type {LendingRecord} from "@/types/Type";

const StudentRecord = () => {
  const loaderData = useLoaderData() as LendingRecord[] | null;
  const navigate = useNavigate();

  // Headless hook - manages state and business logic
  const {
    records,
    allRecords,
    searchTerm,
    searchStatus,
    searchOrder,
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
      await lendingService.returnEquipment(recordId);
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
      await lendingService.deleteLendingRecord(recordId);
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
      searchTerm={searchTerm}
      searchStatus={searchStatus}
      searchOrder={searchOrder}
      statusOptions={statusOptions}
      sortOptions={sortOptions}
      {...searchHandlers}
      {...actionHandlers}
      title="Lending Record"
      showStatistics={true}
    />
  );
};

export default StudentRecord;
