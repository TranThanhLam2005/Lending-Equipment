import { useState } from 'react';
import { Button } from './Button';
import { ChevronDown } from 'lucide-react';
function DropDown({ options, labeled }) {
    const [optionSelected, setOptionSelected] = useState('Default');
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div >
            <div className="flex items-center">
                {labeled && <label className="block mr-2 text-sm font-medium text-gray-500">Sort: </label>}
                <Button
                    variant="outline"
                    size="lg"
                    onClick = {() => setIsOpen(!isOpen)}
                >{optionSelected}
                    <ChevronDown className="md:ml-2 size-4" />
                </Button>
            </div>
            {isOpen && (<div className="w-40 bg-white border rounded-md shadow-lg mt-2 z-10 absolute">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            setOptionSelected(option);
                            setIsOpen(false);
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>)}
        </div>
    );
}
export default DropDown;