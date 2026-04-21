import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleTasks } from "../store/slice";

function TaskCard({ _id, title, description, createdAt, createdBy }) {
  const tasks = useSelector((state) => state.tasks);
  const userData = useSelector((state) => state.userData) || {};

  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState("");

  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.delete(
        `https://ramyoz-task.onrender.com/api/v1/task/deleteTask/${_id}`,
        { withCredentials: true },
      );

      dispatch(handleTasks(tasks.filter((task) => task._id !== _id)));
    } catch (err) {
      setError(
        err.response.data.match(/Error:\s(.+?)<br>/)
          ? err.response.data.match(/Error:\s(.+?)<br>/)[1]
          : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          createdAt: {new Date(createdAt).toLocaleString()}
        </p>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {userData?._id === createdBy && (
          <Link to={`editTask/${_id}`} className="btn btn-primary">
            Update Task
          </Link>
        )}
        {userData?._id === createdBy && (
          <button
            onClick={handleDeleteTask}
            className="btn btn-sm mx-2 btn-outline-danger"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
