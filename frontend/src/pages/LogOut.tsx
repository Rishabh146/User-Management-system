import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../Redux/store";
import {selectUserId, clearToken } from "../Redux/authSlice";
import { toast } from "react-hot-toast";
import Button from "@mui/joy/Button";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId); 
  const handleLogout = () => {
    if (userId) {
      socket.emit('logout', userId);
    }

    dispatch(clearToken());
    persistor.purge();
    toast.success("User Logout Successfully");
    navigate("/");
  };

  return (
    <Button onClick={handleLogout} color="danger" variant="solid">
      Logout
    </Button>
  );
};

export default LogoutButton;

