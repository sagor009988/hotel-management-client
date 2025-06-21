import React from "react";
import Heading from "../Shared/Heading";

const EmptyRoom = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <Heading
        center={true}
        title="No Rooms Available In This Category!"
        subtitle="Please Select Other Categories."
      />
    </div>
  );
};

export default EmptyRoom;
