// import components 
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { format, parseISO } from 'date-fns';

import { CalendarDays, CheckCircle, Sparkles } from 'lucide-react';

const EquipmentCard = ({ isRequest, ...data}) => {
    const formattedDate = format(parseISO(data.purchaseDate), 'EEEE, MMMM dd, yyyy');
    return (
        <Link to="/detail" className="max-w-3xs md:max-w-2xs rounded-sm border border-gray-200 shadow-sm p-2 bg-white hover:shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1">
            {/* Equipment Image */}
            <div className="rounded-sm border border-gray-200 shadow-sm bg-white mb-4">
                <img
                    src="https://m.media-amazon.com/images/I/41mUYAPTs7L._SY300_SX300_QL70_FMwebp_.jpg" // Replace with your image path
                    alt="VR headset"
                    className="w-full h-48 object-contain "
                />

            </div>

            {/* Equipment Type */}
            <span className="inline-block bg-red-400 text-white text-xs font-normal px-2 py-1 rounded-sm mb-2">
                {data.type}
            </span>

            {/* Equipment Name */}
            <h2 className="text-lg font-semibold mb-3">{data.name}</h2>

            {/* Equipment Status */}
            <div className="flex items-center text-sm mb-1 font-normal">
                <CheckCircle className="w-4 h-4 mr-2" />
                {data.status}
            </div>

            {/* Equipment Condition */}
            <div className="flex items-center text-sm mb-1 font-normal">
                <Sparkles className="w-4 h-4 mr-2" />
                {data.condition}
            </div>

            {/* Equipment Purchase Date */}
            <div className="flex items-center text-sm mb-4 font-normal">
                <CalendarDays className="w-4 h-4 mr-2" />
                {formattedDate}
            </div>

            {/* Equipment Button */}

            {isRequest && <div className="flex justify-center items-center md:space-x-4">
                <Button variant="primary" size="lg" className="w-full md:w-auto">
                    Request Borrow
                </Button>
                <Button variant="outline" size="lg" className="hover:bg-red-400 hover:text-white hover:border-none md:block hidden">
                    View Details
                </Button>
            </div>}
            {!isRequest && <Button variant="outline" size="medium" className="hover:bg-red-400 hover:text-white hover:border-none">
                View Details
            </Button>}
        </Link>
    );
};

export default EquipmentCard;