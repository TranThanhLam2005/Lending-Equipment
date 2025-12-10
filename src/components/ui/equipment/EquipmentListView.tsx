/**
 * Pure presentational component for equipment list
 * Displays a grid of equipment cards with search and filter controls
 */

// import types
import type {EquipmentListViewProps} from "@/types/Type";
// import components
import EquipmentCard from "./EquipmentCard";
import {Button} from "@/components/ui/common/Button";
import Dropdown from "@/components/ui/common/Dropdown";
import Input from "@/components/ui/common/Input";
// import icons
import {Package, CheckCircle, XCircle, AlertCircle} from "lucide-react";

const EquipmentListView = ({
  equipmentList,
  allEquipment,
  isSidebarOpen = false,
  filters,
  statusOptions,
  sortOptions,
  searchHandlers,
  actionHandlers,
  isRequest = true,
  title = "Equipment",
  showStatistics = true,
}: EquipmentListViewProps) => {
  // Use allEquipment for statistics, or equipmentList if not provided
  const statsData = allEquipment || equipmentList;
  const totalEquipment = statsData.length;
  const displayCount = equipmentList.length;
  const isFiltered =
    filters.searchTerm.trim() !== "" || filters.searchStatus !== "All";

  // Calculate statistics
  const availableCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "available"
  ).length;

  const borrowedCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "borrowed"
  ).length;

  const maintenanceCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "under maintenance"
  ).length;

  const pendingCount = statsData.filter(
    (item) => item.Status?.toLowerCase() === "pending"
  ).length;

  // Condition breakdown

  const excellentCondition = statsData.filter(
    (item) => item.Condition?.toLowerCase() === "excellent"
  ).length;

  const goodCondition = statsData.filter(
    (item) => item.Condition?.toLowerCase() === "good"
  ).length;

  const fairCondition = statsData.filter(
    (item) => item.Condition?.toLowerCase() === "fair"
  ).length;

  return (
    <div className="min-h-screen">
      {/* Title Section */}
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gray-900 to-gray-600 mt-3 rounded-full"></div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Status Filter */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1">
              <Input
                placeholder="Search by name, type, description, venue, or condition..."
                type="text"
                search
                onChange={(e) => searchHandlers.onSearchChange(e.target.value)}
                value={filters.searchTerm}
              />
            </div>
            <div className="sm:w-64">
              <Dropdown
                value={filters.searchStatus}
                placeholder="Filter by status"
                items={statusOptions.map((text) => ({text}))}
                valueSetter={searchHandlers.onStatusChange}
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="sm:w-64">
            <Dropdown
              value={filters.searchOrder}
              placeholder="Sort by"
              items={sortOptions.map((text) => ({text}))}
              valueSetter={searchHandlers.onSortChange}
            />
          </div>
        </div>

        {/* Equipment Statistics */}
        {showStatistics && totalEquipment > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Total Equipment */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalEquipment}
                  </p>
                </div>
              </div>

              {/* Available Equipment */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase tracking-wider">
                    Available
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {availableCount}
                  </p>
                </div>
              </div>

              {/* Borrowed Equipment */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase tracking-wider">
                    Borrowed
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {borrowedCount}
                  </p>
                </div>
              </div>

              {/* Maintenance/Repair */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase tracking-wider">
                    Maintenance
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {maintenanceCount}
                  </p>
                </div>
              </div>
              {/* Pending Equipment */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium uppercase tracking-wider">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Condition Summary */}
            {(goodCondition > 0 ||
              fairCondition > 0 ||
              excellentCondition > 0) && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="text-gray-600 font-medium">Condition:</span>
                {excellentCondition > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="font-medium">
                      Excellent: {excellentCondition}
                    </span>
                  </span>
                )}
                {goodCondition > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="font-medium">Good: {goodCondition}</span>
                  </span>
                )}
                {fairCondition > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                    <span className="font-medium">Fair: {fairCondition}</span>
                  </span>
                )}
              </div>
            )}

            {/* Filtered results info */}
            {isFiltered && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span className="text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {displayCount}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalEquipment}
                  </span>{" "}
                  {displayCount === 1 ? "item" : "items"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Equipment Grid */}
      <div
        className={`grid grid-cols-1 ${
          isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } sm:grid-cols-2 md:grid-cols-3 gap-6`}
      >
        {equipmentList.map((item) => (
          <EquipmentCard
            key={item.ID}
            id={item.ID}
            name={item.Name}
            type={item.Type}
            status={item.Status}
            condition={item.Condition}
            purchaseDate={item.PurchaseDate}
            isRequest={isRequest}
            onRequestBorrow={actionHandlers.onRequestBorrow}
            onViewDetails={actionHandlers.onViewDetails}
          />
        ))}
      </div>

      {/* Empty State */}
      {equipmentList.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No equipment found
          </h3>
          <p className="text-gray-500 mb-4">
            {isFiltered
              ? "Try adjusting your search or filters"
              : "No equipment available at the moment"}
          </p>
          {isFiltered && (
            <Button
              onClick={() => {
                searchHandlers.onSearchChange("");
                searchHandlers.onStatusChange("All");
              }}
              size="medium"
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EquipmentListView;
