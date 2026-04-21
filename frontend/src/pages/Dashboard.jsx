import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTasks } from "../store/slice";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://ramyoz-task.onrender.com/api/v1/task/getallTasks", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(handleTasks(response.data.data));
      })
      .catch((err) => {
         setError(
            err.response.data.match(/Error:\s(.+?)<br>/)
              ? err.response.data.match(/Error:\s(.+?)<br>/)[1]
              : "An error occurred",
          );
      })
      .finally(() => setLoading(false))
      ;
  }, [dispatch]);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Tasks</h2>
        <button onClick={()=>navigate('/addtask')} className="btn btn-primary">
          + Add Task
        </button>
      </div>
{/*Loading */}
      {loading && (
        <div className="alert alert-info text-center">
          Loading tasks <i className="fa-solid fa-circle-notch fa-spin"></i>
        </div>
      )}

      {/* Error */}
      {error  && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* Tasks */}
      {tasks?.length === 0 ? (
        <div className="alert alert-info text-center">
          No tasks found. Start by adding a new task.
        </div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div  className="col-md-4 mb-3" key={task.id}>
              <TaskCard   {...task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
