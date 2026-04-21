import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();


  const tasks = useSelector((state) => state.tasks) || [];

  const task = tasks.find((ele) => ele._id === taskId);

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        ` https://ramyoz-task.onrender.com/api/v1/task/updateTask/${taskId}`,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Edit Task</h4>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleUpdate}>
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

            

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <button disabled={loading} type="submit" className="btn btn-primary">
                    {loading ? `Updating ${<i className="fa-solid fa-circle-notch fa-spin"></i>}`:"Update Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
