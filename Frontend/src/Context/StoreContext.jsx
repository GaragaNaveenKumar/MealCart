import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const StoreContext=createContext(null);
const apiUrl = import.meta.env.VITE_API_URL;

const StorecontextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);
    const navigate=useNavigate();

    

    const addToCart=async (itemId)=>{
        if(!token){
            alert("Please sign in to add into card");
            navigate("/");
            return;
        }else{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(apiUrl+"/api/cart/add",{itemId},{headers:{token}});
        }}
    }

    const removeCartItem=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(apiUrl+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }



    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){

                let itemInfo=food_list.find((product)=>product._id===item);
                totalAmount+=itemInfo.price* cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList=async ()=>{
        const response=await axios.get(apiUrl+"/api/food/list");
        setFoodList(response.data.data);

    }

    const loadCartData=async (token)=>{
        const response=await axios.post(apiUrl+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);

    }

    useEffect(()=>{
        
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            
        }
        loadData();
    },[])


    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeCartItem,
        getTotalCartAmount,
        token,
        setToken
    };


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default  StorecontextProvider;