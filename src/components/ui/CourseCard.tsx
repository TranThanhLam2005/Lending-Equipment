import { Button } from "@/components/ui/Button";
import { format, parseISO } from 'date-fns';

import { CalendarDays, MapPin, Info, User2, Eye } from "lucide-react";
const CourseCard = ({...data}) => {
    const startDate = format(parseISO(data.startDate), 'dd');
    const startMonth = format(parseISO(data.startDate), 'MMMM');
    const startYear = format(parseISO(data.startDate), 'yyyy');
    const formattedDateEnd = format(parseISO(data.endDate), 'EEEE, MMMM dd, yyyy');

    return (
        <div className="border rounded-lg md:rounded-sm shadow-sm overflow-hidden md:p-3 bg-white">
            <div className="flex md:flex-row flex-col items-start">
                {/* Date */}
                <div className="flex border-b justify-center md:border-b-0 md:mb-0 mb-4 md:p-0 pt-4 pl-4 pr-4">
                    <div className="flex flex-col items-center text-center mr-4 mb-4 md:mb-0 border rounded-lg w-37.5 h-auto ">
                        <div className="w-full text-xl rounded-tr-lg rounded-tl-lg bg-[#F26666] text-white pt-1 pb-1">{startMonth}</div>
                        <div className="text-3xl ">{startDate}</div>
                        <div className="text-xl">{startYear}</div>
                    </div>
                    <div className="text-xl mb-2 md:hidden block">{data.name}</div>
                </div>

                {/* Details */}
                <div className="flex-1 ml-4">
                    <h2 className="text-2xl mb-2 border-b pb-3 md:block hidden">{data.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text--[#475467] border-b pb-3">
                        {DetailInfo({
                            icon: User2,
                            label: "Staff:",
                            info: data.academicName
                        })}

                        {DetailInfo({
                            icon: CalendarDays,
                            label: "Date End:",
                            info: formattedDateEnd
                        })}

                        {DetailInfo({
                            icon: Info,
                            label: "Description:",
                            info: data.description,
                            className: "md:block hidden"
                        })}

                        {DetailInfo({
                            icon: MapPin,
                            label: "Room:",
                            info: data.room,
                        })}

                        {DetailInfo({
                            icon: CalendarDays,
                            label: "Lecture Date:",
                            info: data.lectureDate
                        })}
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="flex justify-end pt-3 md:flex hidden">
                <Button variant="primary" className="ml-2" size="lg">
                    <Eye />
                    More Details
                </Button>
            </div>
        </div>
    );
};
const DetailInfo = ({ icon: Icon, label, info, className = "" }) => {
    return (
        <div className={`space-x-2 ${className}`}>
            <div className="flex items-center ">
                <Icon size={24} />
                <div className="flex flex-col items-start ml-2">
                    <div>{label}</div>
                    <div>{info}</div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
