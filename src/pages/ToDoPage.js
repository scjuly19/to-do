import React, { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, markComplete, removeToDo } from "../store/slice";
const filtersArr = [
  { type: "all", name: "All", isActive: false },
  { type: "pending", name: "Pending", isActive: false },
  { type: "completed", name: "Completed", isActive: false },
];

export default function ToDoPage() {
  const navigate = useNavigate();
  const { user, id } = useParams();
  const data = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState([...filtersArr]);
  const [selectedFilter, setSelectedFilter] = useState(filtersArr);
  const handleTaskComplete = (selectedTask) => {
    dispatch(markComplete({ id: id, task: selectedTask }));
  };
  const handleTaskDelete = (e, selectedTask) => {
    dispatch(removeToDo({ id: id, task: selectedTask }));
  };
  const handleNewTask = (e) => {
    e.preventDefault();
    const newItem = {
      task: newTask,
      id: Math.floor(Math.random() * 100) + user,
      isCompleted: false,
    };
    dispatch(
      addToDo({
        id: id,
        todos: newItem,
      })
    );
  };
  const handleFilter = (e, selectedFilterType) => {
    e.preventDefault();
    const filtersUpdated = filters.map((item) => {
      if (item.type === selectedFilterType) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    setSelectedFilter(selectedFilterType);
    setFilters(filtersUpdated);
  };
  useEffect(() => {
    if (data.length > 0) {
      const selectedProfile = data.filter((item) => item.id === id);
      let updatedTodos;
      switch (selectedFilter) {
        case "pending":
          updatedTodos = selectedProfile[0].todo.filter(
            (item) => !item.isCompleted
          );
          break;
        case "completed":
          updatedTodos = selectedProfile[0].todo.filter(
            (item) => item.isCompleted
          );
          break;
        default:
          updatedTodos = selectedProfile[0].todo;
          break;
      }
      setTodos(updatedTodos);
    }
  }, [data, filters]);
  useEffect(() => {
    console.log("effect", filtersArr);
    const resetFilters = filtersArr.map((item) => {
      item.isActive = false;
      return item;
    });
    setFilters(resetFilters);
  }, [id]);
  return (
    <div className="page-container">
      <header className="todo-header">
        <div>
          <img src="/icons/profile.png" />
          <h2>{user}</h2>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="switch-btn action-btn"
        >
          Switch account
        </button>
      </header>
      <main className="todo-wrapper">
        <div className="filters-wrapper">
          <h3 className="inline">Filters:</h3>
          {filters &&
            filters.map((filter) => (
              <button
                key={filter.type}
                className={`filter-btn ${filter.isActive && "active-filter"}`}
                onClick={(e) => handleFilter(e, filter.type)}
              >
                {filter.name}
              </button>
            ))}
        </div>
        <div className="add-todo-wrapper">
          <input
            className="add-todo-input"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => {
              e.preventDefault();
              setNewTask(e.target.value);
            }}
          />
          <button className="add-btn action-btn" onClick={handleNewTask}>
            Add task
          </button>
        </div>
        {todos && todos.length > 0 && (
          <div className="todo-list-wrapper">
            <ul>
              {todos.map((item) => {
                return (
                  <li className="todo-list-item">
                    <input
                      type="checkbox"
                      onClick={() => handleTaskComplete(item)}
                      className="check-btn"
                      defaultChecked={item.isCompleted}
                    />
                    <p className={`inline ${item.isCompleted && "completed"}`}>
                      {item.task}
                    </p>
                    <button
                      className="remove-todo-btn"
                      onClick={(e) => handleTaskDelete(e, item)}
                    >
                      <img
                        src="/icons/delete.png"
                        style={{ height: 16, width: 16 }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
