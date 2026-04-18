import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import LiveChart from "../components/LiveChart";
import AlertsPanel from "../components/AlertsPanel";
import PredictionPanel from "../components/PredictionPanel";
import DataTable from "../components/DataTable";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/ml-detect")
    .then(res => res.json())
    .then(result => {
      console.log("ML Data:", result);
      setData(result.result);   // this updates your dashboard data
    })
    .catch(err => console.log(err));
}, []);

  // Simulated real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        timestamp: new Date().toLocaleTimeString(),
        area: "Tata Area",
        input_energy: Math.floor(Math.random() * 400) + 1000,
        billed_energy: Math.floor(Math.random() * 300) + 900,
      };

      fetch("http://127.0.0.1:8000/detect", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newEntry),
})
  .then((res) => res.json())
  .then((res) => {
  
})
  
  .catch((err) => console.error(err));

      const loss = newEntry.input_energy - newEntry.billed_energy;
      const lossPercent = ((loss / newEntry.input_energy) * 100).toFixed(2);

      setData((prev) => [...prev.slice(-9), newEntry]);

      const riskLevel = loss > 200 ? "High" : "Low";
      const status = loss > 200 ? "Theft Detected" : "Normal";

      setPrediction({
        prediction: status,
        loss_percent: lossPercent,
        risk_level: riskLevel,
      });

      if (loss > 200) {
        setAlerts((prev) => [
          `⚠️ Theft detected in Tata Area at ${newEntry.timestamp}`,
          ...prev.slice(0, 4),
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalInput = data.reduce((sum, d) => sum + d.input_energy, 0);
  const totalBilled = data.reduce((sum, d) => sum + d.billed_energy, 0);
  const totalLoss = totalInput - totalBilled;

  return (
    <div className="dashboard-layout">
      <Sidebar active={active} setActive={setActive} />

      <div className="main-content">
        <Header />

        {active === "Dashboard" && (
          <>
            <div className="stats">
              <StatCard title="Total Input Energy" value={`${totalInput} kWh`} color="#4f46e5" />
              <StatCard title="Total Billed Energy" value={`${totalBilled} kWh`} color="#16a34a" />
              <StatCard title="Energy Loss" value={`${totalLoss} kWh`} color="#dc2626" />
              <StatCard title="Active Alerts" value={alerts.length} color="#f59e0b" />
            </div>

            <LiveChart data={data} />

            <div className="grid">
              <PredictionPanel prediction={prediction} />
              <AlertsPanel alerts={alerts} />
            </div>

            <DataTable data={data} />
          </>
        )}

        {active === "Analytics" && <h2>📊 Analytics Coming Soon...</h2>}
        {active === "Alerts" && <AlertsPanel alerts={alerts} />}
        {active === "Settings" && <h2>⚙️ Settings Coming Soon...</h2>}
      </div>
    </div>
  );
};

export default Dashboard;
