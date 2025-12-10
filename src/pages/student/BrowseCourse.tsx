// import libraries
import {useNavigate} from "react-router-dom";

// import components
import CourseListView from "@/components/ui/course/CourseListView";
import LoadingPage from "@/components/ui/common/LoadingPage";

// import hooks
import {useCourseList} from "@/hooks/course/useCourseList";
// import handlers
import {
  createCourseSearchHandlers,
  createCourseActionHandlers,
} from "@/handlers/course.handlers";

const BrowseCourse = () => {
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
    statusOptions,
    sortOptions,
  } = useCourseList();

  // Create event handlers
  const searchHandlers = createCourseSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  const actionHandlers = createCourseActionHandlers(navigate);

  // Show loading page on initial load
  if (isLoading && displayData.length === 0) {
    return <LoadingPage />;
  }

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Browse Courses
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-900 to-gray-600 mt-3 rounded-full"></div>
        <p className="mt-3 text-gray-600">
          Discover and explore available courses
        </p>
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
        emptyMessage="There are no courses available at the moment"
        showTotalCount={true}
      />
    </div>
  );
};

export default BrowseCourse;
