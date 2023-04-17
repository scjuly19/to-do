import React, { useState } from "react";

export default function AddProfileForm(props) {
    const [userInput, setUserInput] = useState("");

  const handleUserInputChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
props.onSubmit(userInput)
  }
  return (
    <form>
      <label for="username">Name</label>
      <input
        name="username"
        placeholder="Please enter your name"
        value={userInput}
        onChange={handleUserInputChange}
        className="username-input"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="action-btn username-btn"
        disabled={!userInput}
      >
        Submit
      </button>
    </form>
  );
}
