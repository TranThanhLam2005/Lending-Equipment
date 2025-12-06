/**
 * Pure presentational component for course detail view
 * Displays course information and associated equipment list
 */

import {memo} from "react";
import {format, parseISO} from "date-fns";
import {CalendarDays, MapPin, Info, User2, Home, BookOpen} from "lucide-react";
import type {CourseDetailViewProps} from "@/types/Type";

export type {CourseDetailViewProps};

const CourseDetailView = ({
  courseId,
  courseName,
  description,
  dateStart,
  dateEnd,
  lectureDate,
  room,
  instructorName,
  imageUrl = "https://media.licdn.com/dms/image/v2/D5603AQEe4ZoLQ3_cbA/profile-displayphoto-shrink_200_200/B56ZbFRglsGsAY-/0/1747066424476?e=2147483647&v=beta&t=dtj7XdWmVigvP5yXH-uSyEDj6h3VRJhh0rFD2vNbNBM",
  children,
}: CourseDetailViewProps) => {
  // Format dates
  const formattedDateStart = format(parseISO(dateStart), "dd MMMM yyyy");
  const formattedDateEnd = format(parseISO(dateEnd), "dd MMMM yyyy");

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gray-900 text-white rounded-2xl shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {courseName}
          </h1>
        </div>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"></div>
      </div>

      {/* Course Information Card */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg mb-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex md:flex-row flex-col">
          {/* Image Section */}
          <div className="md:w-2/5 relative overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={courseName}
              className="w-full h-full object-cover min-h-[280px] md:min-h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Information Section */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">
                Course Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailInfo icon={Home} label="Course ID" info={courseId} />
              <DetailInfo
                icon={User2}
                label="Instructor"
                info={instructorName}
              />
              <DetailInfo
                icon={CalendarDays}
                label="Start Date"
                info={formattedDateStart}
              />
              <DetailInfo
                icon={CalendarDays}
                label="End Date"
                info={formattedDateEnd}
              />
              <DetailInfo icon={MapPin} label="Room" info={room} />
              <DetailInfo
                icon={CalendarDays}
                label="Lecture Date"
                info={lectureDate}
              />
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t-2 border-gray-100">
              <DetailInfo icon={Info} label="Description" info={description} />
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Section (passed as children) */}
      {children && <div>{children}</div>}
    </div>
  );
};

interface DetailInfoProps {
  icon: React.ComponentType<{className?: string}>;
  label: string;
  info: string;
  className?: string;
}

const DetailInfo = memo(
  ({icon: Icon, label, info, className = ""}: DetailInfoProps) => {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {label}
          </span>
          <span className="text-sm text-gray-900 font-medium">{info}</span>
        </div>
      </div>
    );
  }
);

DetailInfo.displayName = "DetailInfo";

export default CourseDetailView;
