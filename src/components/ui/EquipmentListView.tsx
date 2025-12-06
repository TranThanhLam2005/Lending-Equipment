/**
 * Pure presentational component for equipment list
 * Displays a grid of equipment cards with search and filter controls
 */

import type {Equipment} from "@/api";
import EquipmentCard from "./EquipmentCard";
import Dropdown from "./Dropdown";
import Input from "./Input";

export interface EquipmentListViewProps {
  equipmentList: Equipment[];
  isSidebarOpen?: boolean;

  // Search and filter values
  searchTerm: string;
  searchStatus: string;
  searchOrder: string;

  // Options for dropdowns
  statusOptions: {text: string}[];
  sortOptions: {text: string}[];

  // Event handlers
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onRequestBorrow?: (equipmentId: string) => void;
  onViewDetails?: (equipmentId: string) => void;

  // Display options
  isRequest?: boolean;
  title?: string;
}

const EquipmentListView = ({
  equipmentList,
  isSidebarOpen = false,
  searchTerm,
  searchStatus,
  searchOrder,
  statusOptions,
  sortOptions,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onRequestBorrow,
  onViewDetails,
  isRequest = true,
  title = "Equipment",
}: EquipmentListViewProps) => {
  return (
    <div>
      <div className="text-2xl md:text-4xl font-medium mb-4">{title}</div>

      {/* Search and Filter Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <div className="hidden md:block">
            <Input
              placeholder="Search Equipment..."
              type="text"
              onChange={(e) => onSearchChange(e.target.value)}
              value={searchTerm}
            />
          </div>
          <Dropdown
            value={searchStatus}
            placeholder="Filter by status:"
            items={statusOptions}
            valueSetter={onStatusChange}
          />
        </div>
        <Dropdown
          value={searchOrder}
          placeholder="Order by:"
          items={sortOptions}
          valueSetter={onSortChange}
        />
      </div>

      {/* Mobile Search */}
      <div className="md:hidden block mb-4">
        <Input
          placeholder="Search Equipment..."
          type="text"
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchTerm}
        />
      </div>

      {/* Equipment Grid */}
      <div
        className={`grid grid-cols-1 ${
          isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-10 justify-items-center`}
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
            onRequestBorrow={onRequestBorrow}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Empty State */}
      {equipmentList.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No equipment found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default EquipmentListView;
