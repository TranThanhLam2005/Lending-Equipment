/**
 * Pure presentational component for lending records
 * Displays a table of lending records with search and filter controls
 * Modern black and white theme
 */

import type {LendingRecordListViewProps} from "@/types/Type";
import Dropdown from "@/components/ui/common/Dropdown";
import Input from "@/components/ui/common/Input";
import {
  CornerUpLeft,
  Trash,
  AlertTriangle,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";

const LendingRecordListView = ({
  records,
  allRecords,
  filters,
  statusOptions,
  sortOptions,
  searchHandlers,
  actionHandlers,
  title = "Lending Records",
  showStatistics = true,
}: LendingRecordListViewProps) => {
  // Use allRecords for statistics
  const statsData = allRecords || records;
  const totalRecords = statsData.length;
  const displayCount = records.length;
  const isFiltered =
    filters.searchTerm.trim() !== "" || filters.searchStatus !== "All";

  // Calculate statistics
  const borrowedCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "borrowed"
  ).length;

  const returnedCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "returned"
  ).length;

  const overdueCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "overdue"
  ).length;

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "borrowed") {
      return (
        <span className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-900 text-white">
          Borrowed
        </span>
      );
    } else if (statusLower === "returned") {
      return (
        <span className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-200 text-gray-900">
          Returned
        </span>
      );
    } else if (statusLower === "overdue") {
      return (
        <span className="px-3 py-1 rounded-md text-sm font-semibold bg-black text-white ">
          Overdue
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-100 text-gray-800">
        {status}
      </span>
    );
  };

  // Get action icon based on status
  const getActionIcon = (record: any) => {
    const statusLower = record.Status?.toLowerCase();
    if (statusLower === "borrowed") {
      return (
        <div title="Return Equipment">
          <CornerUpLeft
            className="w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors"
            onClick={() => actionHandlers.onReturnEquipment(record.ID || "")}
          />
        </div>
      );
    } else if (statusLower === "returned") {
      return (
        <div title="Delete Record">
          <Trash
            className="w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors"
            onClick={() => actionHandlers.onDeleteRecord(record.ID || "")}
          />
        </div>
      );
    } else if (statusLower === "overdue") {
      return (
        <div title="Return Overdue Equipment">
          <AlertTriangle
            className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800 transition-colors"
            onClick={() => actionHandlers.onReturnEquipment(record.ID || "")}
          />
        </div>
      );
    } else if (statusLower === "pending") {
      return (
        <div title="Delete Record">
          <Trash
            className="w-6 h-6 cursor-pointer hover:text-gray-900 transition-colors"
            onClick={() => actionHandlers.onDeleteRecord(record.ID || "")}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Title Section */}
      {title && (
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black">{title}</h1>
          <div className="h-1 w-24 bg-black mt-4 rounded-full"></div>
        </div>
      )}

      {/* Statistics Section */}
      {showStatistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Total Records */}
          <div className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Total Records
                </p>
                <p className="text-3xl font-bold text-black mt-2">
                  {totalRecords}
                </p>
              </div>
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          {/* Borrowed */}
          <div className="bg-gray-900 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                  Currently Borrowed
                </p>
                <p className="text-3xl font-bold mt-2">{borrowedCount}</p>
              </div>
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          {/* Returned */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Returned
                </p>
                <p className="text-3xl font-bold text-black mt-2">
                  {returnedCount}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-black text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                  Overdue
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {overdueCount}
                </p>
              </div>
              <AlertTriangle className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Section */}
      <div className="bg-white border-2 border-black rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex-1 md:max-w-md">
              <Input
                placeholder="Search by equipment, supervisor, or ID..."
                type="text"
                onChange={(e) => searchHandlers.onSearchChange(e.target.value)}
                value={filters.searchTerm}
                search
              />
            </div>
            <Dropdown
              value={filters.searchStatus}
              placeholder="Filter by status"
              items={statusOptions.map((text) => ({text}))}
              valueSetter={searchHandlers.onStatusChange}
            />
          </div>
          <Dropdown
            value={filters.searchOrder}
            placeholder="Sort by"
            items={sortOptions.map((text) => ({text}))}
            valueSetter={searchHandlers.onSortChange}
          />
        </div>

        {/* Results count */}
        {isFiltered && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {displayCount} of {totalRecords} records
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
        {records.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-900 mb-2">
              No records found
            </p>
            <p className="text-gray-600">
              {isFiltered
                ? "Try adjusting your filters"
                : "You haven't borrowed any equipment yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-black">
              <thead className="bg-black text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Equipment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Supervisor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Borrowed Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Return Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record, index) => (
                  <tr
                    key={record.ID || index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.ID || index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">
                      {record.EquipmentName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {record.SupervisorName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(record.BorrowDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(record.ReturnDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.Status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {getActionIcon(record)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LendingRecordListView;
