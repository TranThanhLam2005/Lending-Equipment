// import libraries
import { useState } from "react";
import { useLoaderData } from "react-router-dom";


// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import CourseCard from "@/components/ui/CourseCard";


const statusItems = [
  { text: "All" },
  { text: "Available" },
  { text: "Borrowed" },
];
const sortItems = [
  { text: "Default" },
  { text: "Most Recent" },
  { text: "Oldest" },
];
const MyCourse = () => {
  
  const data = useLoaderData();

  const [searchStatus, setSearchStatus] = useState("All");
  const [searchOrder, setSearchOrder] = useState("Default");
  return (
    <div>
      <div className="text-2xl md:text-4xl font-medium mb-4">Courses</div>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <div className="hidden md:block">
            <Input
              placeholder="Search Course..."
              type="text"
              search
            />
          </div>
          <Dropdown
            value={searchStatus}
            placeholder="Order events by:"
            items={statusItems}
            valueSetter={setSearchStatus}
          />
        </div>
        <Dropdown
          value={searchOrder}
          placeholder="Order events by:"
          items={sortItems}
          valueSetter={setSearchOrder}
        />
      </div>
      <div className="md:hidden block mb-4">
        <Input
          placeholder="Search Course..."
          type="text"
          search
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data.map((course: any) => (
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
          />
        ))}
      </div>
    </div>
  );
}
export default MyCourse;