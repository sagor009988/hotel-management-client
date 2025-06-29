import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckOutForm.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ closeModal, bookingInfo,refetch }) => {
  const navigate=useNavigate()
  const {user}=useAuth()
  const [clientSecret, setClientSecret] = useState();
  const[cardError,setCardError]=useState("");
  const [processing,setProcessing]=useState(false);
  const stripe = useStripe();
  const axiosSecure=useAxiosSecure();
  const elements = useElements();
  useEffect(()=>{
    if(bookingInfo?.price && bookingInfo.price >1){
        getClientSecret({price:bookingInfo?.price})
    }
  },[bookingInfo?.price])

//   get client secret
const getClientSecret=async(price)=>{
    const {data}=await axiosSecure.post("/create-payment-intent",price);
    console.log(data);
    setClientSecret(data.clientSecret)
    
}


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error);
      setProcessing(false)
      return
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError('')
    }
    // confirm payments
   const {error:confirmError , paymentIntent}= await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
          email:user?.email,
          name:user?.displayName,
        }
      }
    });
    if(confirmError){
      console.log(confirmError);
      setCardError(confirmError);
      setProcessing(false)
      return
    };
    if(paymentIntent.status ==="succeeded"){
      setProcessing(false)
      toast.success(`Payment ${bookingInfo?.price} successfully!`)
      // 1  create a payment  info object
      const paymentInfo={
        ...bookingInfo,
        roomId:bookingInfo?._id,
        transactionId:paymentIntent.id,
        date:new Date()

      }
      delete paymentInfo?._id
      
      try{
        // 2. save payment info in booking collection (db)
       const {data}= await axiosSecure.post("/bookings",paymentInfo);
        
      //  change the room Status

        const {data:data2}=await axiosSecure.patch(`/room/status/${bookingInfo?._id}`,{status:true});
        console.log(data2);
        
        
        // modal close
        closeModal()
        navigate("/dashboard/my-bookings")
        // update ui
        refetch()
      }catch (err){
        console.log(err);
        
      }
      
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <div className="flex mt-2 justify-around">
        <button
          disabled={!stripe || !clientSecret || processing}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
         {
          processing ? <ImSpinner9 className="animate-spin m-auto "/>: ` Pay $${bookingInfo.price}`
         }
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
    {cardError && <p className="text-center tex-3xl text-red-600">{cardError.message}</p>}
    </>
  );
};

export default CheckoutForm;
