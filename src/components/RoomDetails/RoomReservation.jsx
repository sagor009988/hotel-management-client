import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { differenceInDays } from "date-fns";
import useAuth from "../../hooks/useAuth";
import BookingModal from "../Modal/BookingModel";

const RoomReservation = ({ room }) => {
  const {user}=useAuth();
  const [isOpen,setIsOpen]=useState(false);

  const closeModal=()=>{
    setIsOpen(false)
  };

  
  
  const [state, setState] = useState([
    {
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: "selection",
    },
  ]);

  const totalPrice=parseInt(differenceInDays(
    new Date(room.to),
    new Date(room.from)
  ))*room?.price
  
  const bookingInfo={
    ...room,
    price: totalPrice,
    guest:{name:user?.displayName}
  }

  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}/</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <DateRange
        showDateDisplay={false}
        rangeColors={['#ff6c83']}
          editableDateInputs={true}
          onChange={(item) => setState(state)}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button onClick={()=>setIsOpen(true)} label={"Reserve"} />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
      <BookingModal isOpen={isOpen} closeModal={closeModal} bookingInfo={bookingInfo}></BookingModal>
    </div>
  );
};

RoomReservation.propTypes = {
  room: PropTypes.object,
};

export default RoomReservation;
