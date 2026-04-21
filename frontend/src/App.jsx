import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { authLogin, authLogout } from "./store/slice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
  
      axios
        .get("https://ramyoz-task.onrender.com/api/v1/user/getCurrentUser", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.data) {
            dispatch(authLogin(response.data.data));
          } else {
            dispatch(authLogout());
          }
        })
        .catch((err) => {
          setError(
            err.response.data.match(/Error:\s(.+?)<br>/)
              ? err.response.data.match(/Error:\s(.+?)<br>/)[1]
              : "An error occurred",
          );
        })
        .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let timer;

    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 10000);
    
    }

    return () => clearTimeout(timer);
  

  }, [error]);

  return (
    <>
      <Navbar />
      {loading ? <h1 className="text-center mt-3">Loading...</h1> : null}
      {error ? (
        <h1 className=" text-center text-danger mt-3">{error}</h1>
      ) : null}
      <Outlet context={{ loading }} />
    </>
  );
}

export default App;
