import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";
import useRole from "../../../hooks/useRole";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HostModal from "../../Modal/HostRequestModal";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const GuestMenu = () => {
  const [role] = useRole();
  const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  // host request modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // confirm request to host
  const modalHandler = async () => {
    try {
      const userInto = {
        name: user?.displayName,
        email: user?.email,
        role: "host",
        status: "Requested",
      };

      const { data } = await axiosSecure.put(`/user`, userInto);
      if (data.modifiedCount > 0) {
        toast.success("Request success ! please wait for admin confirmation!");
      } else {
        toast.success("please! ,wait for admin Approval🎆");
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />

      {role === "guest" && (
        <div onClick={()=>setIsModalOpen(true)} className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer">
          <GrUserAdmin className="w-5 h-5" />

          <span className="mx-4 font-medium">Become A Host</span>
        </div>
      )}
      <HostModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      ></HostModal>
    </>
  );
};

export default GuestMenu;
