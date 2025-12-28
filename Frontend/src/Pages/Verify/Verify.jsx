import React, { useEffect } from 'react';
import "./Verify.css";
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const apiUrl=import.meta.env.VITE_API_URL;
    const navigate=useNavigate();


    const verifyPayment=async (req,res)=>{
        const response=await axios.post(apiUrl+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify
