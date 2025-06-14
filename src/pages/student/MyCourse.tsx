import { useLoaderData } from "react-router-dom";
// import components  
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import CourseCard from "@/components/ui/CourseCard";
const MyCourse = () => {
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
          <Dropdown options={['Default', 'Most Recent', 'Oldest']} />
        </div>
        <Dropdown options={['Default', 'Most Recent', 'Oldest']} labeled />
      </div>
      <div className="md:hidden block mb-4">
        <Input
          placeholder="Search Course..."
          type="text"
          search
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        </div>
    </div>
  );
}
export default MyCourse;