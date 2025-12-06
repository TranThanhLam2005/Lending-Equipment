// import libraries
import {useLoaderData, useNavigate} from "react-router-dom";

// import components
import CourseListView from "@/components/ui/course/CourseListView";
// import hooks
import {useCourseList} from "@/hooks/course/useCourseList";
// import handlers
import {
  createCourseSearchHandlers,
  createCourseActionHandlers,
} from "@/handlers/course.handlers";

const MyCourse = () => {
  const data = useLoaderData() as any[];
  const navigate = useNavigate();

  // Use the headless hook for course list management
  const {
    courses,
    displayData,
    filters,
    isLoading,
    error,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    refreshCourses,
    statusOptions,
    sortOptions,
  } = useCourseList({initialData: data});

  // Create event handlers
  const searchHandlers = createCourseSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  const actionHandlers = createCourseActionHandlers(
    navigate,
    undefined,
    undefined,
    refreshCourses
  );

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          My Courses
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-900 to-gray-600 mt-3 rounded-full"></div>
      </div>

      {/* Course List View */}
      <CourseListView
        courses={courses}
        displayData={displayData}
        filters={filters}
        isLoading={isLoading}
        error={error}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        searchHandlers={searchHandlers}
        actionHandlers={actionHandlers}
        searchPlaceholder="Search courses by name, instructor, description, or room..."
        emptyMessage="You don't have any enrolled courses yet"
        showTotalCount={true}
      />
    </div>
  );
};

export default MyCourse;
