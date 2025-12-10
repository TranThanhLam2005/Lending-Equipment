// import libraries
import {Link} from "react-router-dom";
import {format, parseISO} from "date-fns";

// import components
import {Button} from "@/components/ui/common/Button";

// import icons
import {CalendarDays, MapPin, Info, User2, Eye, BookOpen} from "lucide-react";

// import types
import type {CourseCardProps} from "@/types/Type";


const CourseCard = ({
  id,
  name,
  startDate,
  endDate,
  description = "No description",
  lectureDate = "N/A",
  room = "N/A",
  academicName = "Unknown",
  onViewDetails,
}: CourseCardProps) => {
  const startDateParsed = parseISO(startDate);
  const startDay = format(startDateParsed, "dd");
  const startMonth = format(startDateParsed, "MMM");
  const startYear = format(startDateParsed, "yyyy");
  const formattedDateEnd = format(parseISO(endDate), "EEEE, MMMM dd, yyyy");

  const handleClick = (e: React.MouseEvent) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(id);
    }
  };

  return (
    <Link
      to={`/course/my_course/${id}`}
      onClick={handleClick}
      className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-900 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex md:flex-row flex-col">
        {/* Date Badge */}
        <div className="flex md:border-r-2 border-gray-200 md:p-6 p-4 md:w-auto w-full md:justify-start justify-center">
          <div className="flex flex-col items-center text-center bg-gray-900 text-white rounded-2xl p-4 min-w-[120px] shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
              {startMonth}
            </div>
            <div className="text-5xl font-bold my-2">{startDay}</div>
            <div className="text-sm font-medium opacity-90">{startYear}</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Title */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                {name}
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-4"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DetailInfo icon={User2} label="Instructor" info={academicName} />
            <DetailInfo
              icon={CalendarDays}
              label="End Date"
              info={formattedDateEnd}
            />
            <DetailInfo icon={MapPin} label="Room" info={room} />
            <DetailInfo
              icon={CalendarDays}
              label="Lecture"
              info={lectureDate}
            />
            <DetailInfo
              icon={Info}
              label="Description"
              info={description}
              className="md:col-span-2"
            />
          </div>

          {/* Button */}
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const DetailInfo = ({
  icon: Icon,
  label,
  info,
  className = "",
}: {
  icon: any;
  label: string;
  info: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <Icon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm text-gray-900 font-medium line-clamp-2">
          {info}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
