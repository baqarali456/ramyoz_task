import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddTask() {
  const navigate = useNavigate();

const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); 
    try {
      await axios.post(
        ` https://ramyoz-task.onrender.com/api/v1/task/createTask`,
        formData,
        { withCredentials: true },
      );

      navigate("/");
    } catch (err) {
       setError(
            err.response.data.match(/Error:\s(.+?)<br>/)
              ? err.response.data.match(/Error:\s(.+?)<br>/)[1]
              : "An error occurred",
          );
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Add New Task</h4>

              <form onSubmit={handleAddTask}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit" className=" btn btn-primary mx-auto" disabled={loading}>
                  {loading ? `Adding...${<i className="fa-solid fa-circle-notch fa-spin"></i>}` : "Add Task"}
                </button>
              </form>
              {
                error && <p className=" text-danger text-center">{error}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
