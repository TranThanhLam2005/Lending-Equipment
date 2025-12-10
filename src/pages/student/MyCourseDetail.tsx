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

  const actionHandlers = {
    onRequestBorrow: handleRequestBorrow,
    onViewDetails: handleViewDetails,
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
        <EquipmentListView
          equipmentList={displayData}
          allEquipment={equipmentList}
          filters={filters}
          statusOptions={statusOptions}
          sortOptions={sortOptions}
          searchHandlers={searchHandlers}
          actionHandlers={actionHandlers}
          isRequest={true}
          title="Course Equipment"
        />
      </div>
    </CourseDetailView>
  );
};

export default MyCourseDetail;
