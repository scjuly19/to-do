import "./App.css";
import Home from "./pages/Homepage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage";
import ToDoPage from "./pages/ToDoPage";
import { useSelector } from "react-redux";

function App() {
  const todo = useSelector((state) => state.todo.data);
  const userExists = todo.length > 0;
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userExists ? <ProfilesPage /> : <Home />} />
          <Route path="/profile" element={<ProfilesPage />} />
          <Route path="/mytodo/:user/:id" element={<ToDoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
