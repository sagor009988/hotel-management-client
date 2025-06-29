
import { format } from "date-fns";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateRoomModal from "../../Modal/UpdateRoomModal";

const RoomDataRow = ({ room, refetch, handleRoomDelete }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen,setIsEditModalOpen]=useState(false);
  console.log(isEditModalOpen);
  
  const closeModal=()=>{
    setIsOpen(false)
  }
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal isOpen={isOpen} closeModal={closeModal} handleRoomDelete={handleRoomDelete} id={room?._id}></DeleteModal>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span onClick={()=>setIsEditModalOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        {/* Update Modal */}
        <UpdateRoomModal room={room} refetch={refetch} setIsEditModalOpen={setIsEditModalOpen} isOpen={isEditModalOpen}></UpdateRoomModal>
      </td>
    </tr>
  );
};



export default RoomDataRow;
