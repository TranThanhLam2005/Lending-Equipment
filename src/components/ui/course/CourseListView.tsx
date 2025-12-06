// import libraries
import {BookOpen} from "lucide-react";

// import components
import Dropdown from "@/components/ui/common/Dropdown";
import Input from "@/components/ui/common/Input";
import CourseCard from "@/components/ui/course/CourseCard";

// import types
import type {CourseListViewProps} from "@/types/Type";

const CourseListView = ({
  courses,
  displayData,
  filters,
  isLoading = false,
  error = null,
  statusOptions,
  sortOptions,
  searchHandlers,
  actionHandlers,
  searchPlaceholder = "Search courses...",
  emptyMessage = "You don't have any enrolled courses yet",
  showTotalCount = true,
}: CourseListViewProps) => {
  // Format dropdown items
  const statusItems = statusOptions.map((text) => ({text}));
  const sortItems = sortOptions.map((text) => ({text}));

  // Calculate statistics
  const totalCourses = courses.length;
  const filteredCount = displayData.length;
  const isFiltered =
    filters.searchTerm.trim() !== "" || filters.status !== "All";

  // Status breakdown
  const now = new Date();
  const activeCourses = courses.filter((course) => {
    const startDate = course.DateStart ? new Date(course.DateStart) : null;
    const endDate = course.DateEnd ? new Date(course.DateEnd) : null;
    return startDate && endDate && startDate <= now && now <= endDate;
  }).length;

  const upcomingCourses = courses.filter((course) => {
    const startDate = course.DateStart ? new Date(course.DateStart) : null;
    return startDate && now < startDate;
  }).length;

  const completedCourses = courses.filter((course) => {
    const endDate = course.DateEnd ? new Date(course.DateEnd) : null;
    return endDate && now > endDate;
  }).length;

  return (
    <>
      {/* Search and Filter Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Status Filter */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1">
              <Input
                placeholder={searchPlaceholder}
                type="text"
                search
                value={filters.searchTerm}
                onChange={(e) => searchHandlers.onSearchChange(e.target.value)}
              />
            </div>
            <div className="sm:w-64">
              <Dropdown
                value={filters.status}
                placeholder="Filter by status"
                items={statusItems}
                valueSetter={searchHandlers.onStatusChange}
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="sm:w-64">
            <Dropdown
              value={filters.sortOrder}
              placeholder="Sort by"
              items={sortItems}
              valueSetter={searchHandlers.onSortChange}
            />
          </div>
        </div>

        {/* Course Statistics */}
        {showTotalCount && totalCourses > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total Courses */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalCourses}
                  </p>
                </div>
              </div>

              {/* Active Courses */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Active
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {activeCourses}
                  </p>
                </div>
              </div>

              {/* Upcoming Courses */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Upcoming
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {upcomingCourses}
                  </p>
                </div>
              </div>

              {/* Completed Courses */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-900 text-white rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {completedCourses}
                  </p>
                </div>
              </div>
            </div>

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
                    {filteredCount}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalCourses}
                  </span>{" "}
                  {filteredCount === 1 ? "course" : "courses"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-1">
                Error Loading Courses
              </h3>
              <p className="text-red-600">{error}</p>
              {actionHandlers.onRefresh && (
                <button
                  onClick={actionHandlers.onRefresh}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course List */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6">
          {displayData.map((course: any) => (
            <CourseCard
              key={course.CourseID}
              id={course.CourseID}
              name={course.CourseName}
              startDate={course.DateStart}
              endDate={course.DateEnd}
              description={course.Description}
              lectureDate={course.LectureDate}
              room={course.Room}
              academicName={course.AcademicStaffName}
              onViewDetails={actionHandlers.onViewDetails}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && displayData.length === 0 && (
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500">
            {isFiltered ? "Try adjusting your filters" : emptyMessage}
          </p>
          {isFiltered && (
            <button
              onClick={() => {
                searchHandlers.onSearchChange("");
                searchHandlers.onStatusChange("All");
              }}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CourseListView;
