import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../Redux/store";
import { clearToken } from "../Redux/authSlice";
import { toast } from "react-hot-toast";
import Button from "@mui/joy/Button";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
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
