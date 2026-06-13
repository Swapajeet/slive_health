import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Graph } from "./Graph";
import { ToastContainer, toast } from "react-toastify";
import "./form.css";

function Form() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [cookies, setCookie, removeCookie] =
    useCookies(["token"]);

  const [formData, setFormData] = useState({
    conductivity: "",
    oxygen: "",
    methane: "",
    ammonia: "",
  });

  const [result, setResult] = useState([]);

  const [predictedDisease, setPredictedDisease] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3001/predict",
        formData,
        { withCredentials: true }
      );

      setResult(res.data.result);
      setPredictedDisease(res.data.predictedDisease);
      setConfidence(res.data.confidence);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const labels = result.map((item) => item.disease);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Disease Probability %",
        data: result.map((item) => item.percentage),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const Logout = async () => {
    try {
      const { data } = await axios.get(
        "https://slive-health.onrender.com/logout",
        { withCredentials: true }
      );

      removeCookie("token", { path: "/" });

      handleSuccess(data.message || "Logout Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.log(error);
      handleError("Logout Failed");
    }
  };

  return (
    <div className="form-page">

      <ToastContainer />

      {/* 🔥 LOADER OVERLAY */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="spinner"></div>
            <h3>Analyzing Data...</h3>
          </div>
        </div>
      )}

      <div className="prediction-card">

        <button className="logout-btn" onClick={Logout}>
          Logout
        </button>

        <h1 className="title">Disease Prediction</h1>

        <form className="prediction-form" onSubmit={handleSubmit}>
          <input type="number" name="conductivity" placeholder="Conductivity" onChange={handleChange} required />
          <input type="number" name="oxygen" placeholder="Oxygen ADC" onChange={handleChange} required />
          <input type="number" name="methane" placeholder="Methane ADC" onChange={handleChange} required />
          <input type="number" name="ammonia" placeholder="Ammonia ADC" onChange={handleChange} required />

          <button className="predict-btn" type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Disease"}
          </button>
        </form>

        {predictedDisease && (
          <div className="result-box">
            <h2>Predicted Disease</h2>
            <p className="disease-name">{predictedDisease}</p>
            <p className="confidence">Confidence: {confidence}%</p>
          </div>
        )}

        {result.length > 0 && (
          <div className="graph-section">
            <Graph data={data} />
          </div>
        )}

      </div>
    </div>
  );
}

export default Form;