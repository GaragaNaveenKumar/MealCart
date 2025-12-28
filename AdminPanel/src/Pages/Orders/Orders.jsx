import React, { useState ,useEffect} from 'react';
import "./Orders.css";
import axios from "axios";
import {toast} from "react-toastify";

const Orders = () => {

  const [orders,setOrders]=useState([]);

  const apiUrl=import.meta.env.VITE_API_URL;

  const fetchAllOrders =async ()=>{
    const response=await axios.get(apiUrl+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      <h3>Order page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div className='order-item'>
            

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders;
