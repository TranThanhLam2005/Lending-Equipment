// import libraries
import {useLoaderData, useNavigate} from "react-router-dom";

// import components
import CourseDetailView from "@/components/ui/course/CourseDetailView";
import EquipmentListView from "@/components/ui/equipment/EquipmentListView";
// import hooks
import {useCourseDetail} from "@/hooks/course/useCourseDetail";
import {useEquipmentList} from "@/hooks/equipment/useEquipmentList";
// import handlers
import {createEquipmentSearchHandlers} from "@/handlers";

// import config
import {ROUTES} from "@/api/config";

const MyCourseDetail = () => {
  const data = useLoaderData() as any;
  const navigate = useNavigate();

  // Use headless hook for course detail
  const {courseData} = useCourseDetail({
    initialData: data,
  });

  // Use headless hook for equipment list
  const {
    equipmentList,
    displayData,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    statusOptions,
    sortOptions,
    error: equipmentError,
  } = useEquipmentList({
    initialData: courseData.Equipments || [],
  });

  // Create event handlers
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  const handleRequestBorrow = (equipmentId: string) => {
    // Navigate to equipment detail page
    // navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
    console.log("Request borrow for equipment ID:", equipmentId);
  };

  const handleViewDetails = (equipmentId: string) => {
    navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
  };

  return (
    <CourseDetailView
      courseId={courseData.CourseID}
      courseName={courseData.CourseName}
      description={courseData.Description}
      dateStart={courseData.DateStart}
      dateEnd={courseData.DateEnd}
      lectureDate={courseData.LectureDate}
      room={courseData.Room}
      instructorName={courseData.AcademicStaffName}
    >
      {/* Equipment List Section */}
      <div>
        {equipmentError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {equipmentError}
          </div>
        )}

        <EquipmentListView
          equipmentList={displayData}
          allEquipment={equipmentList}
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
          title="Course Equipment"
        />
      </div>
    </CourseDetailView>
  );
};

export default MyCourseDetail;
