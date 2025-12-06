// import libraries
import {Link} from "react-router-dom";
import {format, parseISO} from "date-fns";

// import components
import {Button} from "@/components/ui/common/Button";

// import routes
import {ROUTES} from "@/api/config";

// import icons
import {CalendarDays, CheckCircle, Sparkles} from "lucide-react";

// import types
import type {EquipmentCardProps} from "@/types/Type";

export type {EquipmentCardProps};

/**
 * Pure presentational component for displaying equipment card
 * All data and handlers passed as props for headless UI pattern
 */

const EquipmentCard = ({
  id,
  name,
  type,
  status,
  condition,
  purchaseDate,
  imageUrl = "https://m.media-amazon.com/images/I/41mUYAPTs7L._SY300_SX300_QL70_FMwebp_.jpg",
  isRequest = false,
  onRequestBorrow,
  onViewDetails,
}: EquipmentCardProps) => {
  const formattedDate = format(parseISO(purchaseDate), "EEEE, MMMM dd, yyyy");

  const handleRequestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRequestBorrow) {
      onRequestBorrow(id);
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  return (
    <Link
      to={ROUTES.STUDENT_EQUIPMENT_DETAIL(id)}
      className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-900 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Equipment Image */}
      <div className="relative bg-gray-50 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 sm:h-48 md:h-56 object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Status Badge - Floating */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
          <span
            className={`inline-flex items-center gap-0.5 sm:gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-sm ${
              status === "Available"
                ? "bg-black/80 text-white"
                : "bg-white/80 text-gray-900 border border-gray-300"
            }`}
          >
            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
        {/* Equipment Type */}
        <span className="inline-block bg-gray-900 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-3 w-fit">
          {type}
        </span>

        {/* Equipment Name */}
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-gray-700 transition-colors line-clamp-2 flex-grow">
          {name}
        </h2>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-2 sm:mb-3 md:mb-4"></div>

        {/* Equipment Details */}
        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 md:mb-6">
          {/* Equipment Condition */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" />
            <span className="font-medium truncate">{condition}</span>
          </div>

          {/* Equipment Purchase Date */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" />
            <span className="font-medium truncate">{formattedDate}</span>
          </div>
        </div>

        {/* Equipment Button */}
        {isRequest && (
          <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full bg-black text-white hover:bg-gray-800 border-none text-xs sm:text-sm h-8 sm:h-9 md:h-10"
              onClick={handleRequestClick}
            >
              Request Borrow
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
              onClick={handleViewClick}
            >
              View Details
            </Button>
          </div>
        )}
        {!isRequest && (
          <Button
            variant="outline"
            size="medium"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-xs sm:text-sm h-8 sm:h-9 md:h-10 mt-auto"
            onClick={handleViewClick}
          >
            View Details
          </Button>
        )}
      </div>
    </Link>
  );
};

export default EquipmentCard;
