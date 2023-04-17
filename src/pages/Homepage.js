import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProfile } from "../store/slice";
import AddProfileForm from "../components/AddProfileForm";

export default function Home() {
  const navigate = useNavigate();
  const tododData = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();
  const addUser = (userInput) => {
    const newUser = {
      name: userInput,
      todo: [],
      id: Math.floor(Math.random() * 100) + userInput,
    };
    dispatch(addProfile(newUser));
    navigate("/profile");
  };

  return (
    <div className="page-container homepage-wrapper">
      <h1>Start creating your TODO list</h1>
      <AddProfileForm onSubmit={addUser} />
    </div>
  );
}
