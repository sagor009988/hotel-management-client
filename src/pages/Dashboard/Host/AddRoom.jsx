import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import{ toast} from "react-hot-toast"
import {
  useMutation,
} from '@tanstack/react-query'
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const axiosSecure=useAxiosSecure()
  const {user}=useAuth()
  const [imagePreview,setImagePreview]=useState();
  const [imageText,setImageText]=useState('Upload image')
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
  // handle date range
  const handleDates = (items) => {
    setDates(items.selection);
  };
  // post a data to add 
  const { mutateAsync } = useMutation({
    mutationFn: async roomData => {
      const { data } = await axiosSecure.post(`/room`, roomData)
      return data
    },
    onSuccess: () => {
      console.log('Data Saved Successfully')
      toast.success('Room Added Successfully!')
      navigate('/dashboard/my-listings')
      setLoading(false)
    },
  })

   //   Form handler
   const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const location = form.location.value
    const category = form.category.value
    const title = form.title.value
    const to = dates.endDate
    const from = dates.startDate
    const price = form.price.value
    const guests = form.total_guest.value
    const bathrooms = form.bathrooms.value
    const description = form.description.value
    const bedrooms = form.bedrooms.value
    const image = form.image.files[0];
    

    const host={
      name:user?.displayName,
      image:user?.photoURL,
      email:user?.email
    }
    try{
      const image_url=await imageUpload(image)
      const roomData={
        location,category,title,to,from,price,guests,bathrooms,description,bedrooms,image:image_url,host:host
      }
      // add a room 

     await mutateAsync(roomData)
      setLoading(true)
    }catch(err){
      console.log(err.message);
      setLoading(false)
      toast.error(err.message)
    }
   }
  //  handle image preview
  const handleImage= image=>{
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Add a Room</h1>
      <AddRoomForm dates={dates} handleDates={handleDates} 
      handleImage={handleImage}
      imagePreview={imagePreview}
      imageText={imageText}
      handleSubmit={handleSubmit}
      loading={loading}
      ></AddRoomForm>
    </div>
  );
};

export default AddRoom;
