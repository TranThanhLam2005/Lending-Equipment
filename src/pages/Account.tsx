import { useState } from 'react';

import { Button } from '@/components/ui/Button';
const Account = () => {
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);


  return (
    <div>
      <div className="text-2xl md:text-4xl font-medium mb-4">Equipment</div>
      <div className="flex flex-col md:flex-row gap-x-2">
        <div className="flex flex-col items-center md:w-64 rounded-lg shadow-lg bg-white p-4 gap-y-4 mb-4 md:mb-0">
          <img
            src="https://photo.znews.vn/w660/Uploaded/wobjcak/2025_06_26/2025_06_24T003745Z_489823096_UP1EL6O01QV0H_RTRMADP_3_SOCCER_CLUB_MIA_PAL.JPG"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <p className="">ID: The goat</p>
          <Button variant="outline">Change Avatar</Button>
        </div>
        <div className="flex-1 rounded-lg shadow-lg bg-white p-4">
          <div className="text-xl font-semibold mb-4 border-b-1 pb-2">Personal Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
            {inputField('Full Name:', 'Lionel Messi', 'text')}
            {inputField('Email:', 's4038329@gmail.com', 'email')}
            {inputField('Phone Number:', '+1234567890', 'tel')}
            {inputField('Date of Birth:', '1987-06-24', 'date')}
            {inputField('Address:', '123 Main St, City, Country', 'text')}
            {inputField('Username:', 'messi_goat', 'text')}
          </div>

          {isEditInfo ? (<div className="mt-4 flex justify-end gap-x-2">
            <Button variant="secondary" size="medium" onClick={() => setIsEditInfo(!isEditInfo)}>Cancel</Button>
            <Button variant="primary" size="medium">Save</Button>
          </div>) : (<div className="flex justify-end mt-4" onClick={() => setIsEditInfo(!isEditInfo)}>
            <Button variant="primary" size="medium">Edit</Button>
          </div>)}

        </div>
      </div>
      <div className="mt-8 rounded-lg shadow-lg bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
          {inputField('Current Password:', '', 'password')}
          {inputField('New Password:', '', 'password')}
        </div>

        <div className="mt-4">
          Special Requirements:
          <ul className="list-disc pl-6 mt-2 text-sm text-gray-600">
            <li>Password have at least 10 character</li>
            <li>Password have at least 10 character</li>
            <li>Password have at least 10 character</li>
            <li>Password have at least 10 character</li>
          </ul>
        </div>
        <div className="ml-auto mt-4 flex justify-end gap-x-2">
          {isEditPassword ? (
            <>
              <Button variant="secondary" size="medium" onClick={() => setIsEditPassword(!isEditPassword)}>Cancel</Button>
              <Button variant="primary" size="medium" >Save</Button>
            </>
          ) : (
            <Button variant="primary" size="medium" onClick={() => setIsEditPassword(!isEditPassword)}>Change Password</Button>
          )}
        </div>
      </div>
    </div>
  );
}
const inputField = (label: string, value: string, type: string) => (
  <div className="flex justify-between items-center gap-x-6">
    <div className="block text-sm font-medium text-gray-700 mb-1">{label}</div>
    <input
      type={type}
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);




export default Account;