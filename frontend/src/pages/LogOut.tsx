import React from "react";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../Redux/store";
import { toast } from "react-hot-toast";
import Button from "@mui/joy/Button";
import { io } from "socket.io-client";
import {selectUser } from "../Redux/authSlice";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser); 
  const userId=user?.id
  const handleLogout = () => {
    if (userId) {
      socket.emit('logout', userId);
    }
    persistor.purge().then((res)=> {

      navigate("/login", {replace: true});
      toast.success("User Logout Successfully");
    }).catch(()=>{
      console.log('some error occures')
    });
    
  };

  return (
    <Button onClick={handleLogout} color="danger" variant="solid">
      Logout
    </Button>
  );
};

export default LogoutButton;

