import React from "react";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddProfileForm from "../components/AddProfileForm";
import { addProfile, selectedUser } from "../store/slice";

export default function ProfilesPage() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();

  const handleProfileClick = (selectedProfile) => {
    dispatch(selectedUser(selectedProfile));
    navigate(`/mytodo/${selectedProfile.name}/${selectedProfile.id}`);
  };
  const handleAddProfile = (userInput) => {
    const newUser = {
      name: userInput,
      todo: [],
      id: Math.floor(Math.random() * 100) + userInput,
    };
    dispatch(addProfile(newUser));
  };
  return (
    <div className="page-container  profile-wrapper">
      {users.map((item) => (
        <li style={{ listStyle: "none", margin: 10 }} key={item}>
          <IconButton
            icon="/icons/profile.png"
            onClick={() => handleProfileClick(item)}
          />
          <p style={{ marginLeft: 15 }}>{item.name}</p>
        </li>
      ))}
      <div style={{ marginBottom: 50 }}>
        <Popup
          trigger={<IconButton icon="/icons/plus.png" />}
          position="right center"
          modal
        >
          {(close) => (
            <div className="modal">
              <AddProfileForm
                onSubmit={(val) => {
                  handleAddProfile(val);
                  close();
                }}
              />
              <button onClick={close} className="close-modal-btn">
                X
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}
