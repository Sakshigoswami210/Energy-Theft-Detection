import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LiveChart = ({ data }) => {
  return (
    <div className="card">
      <h3 className="chart-title">Live Energy Consumption</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" />
          <XAxis dataKey="timestamp" stroke="#64748b" />
          <YAxis stroke="#64748b" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="input_energy"
            stroke="#4f46e5"
            strokeWidth={4}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            name="Input Energy"
          />

          <Line
            type="monotone"
            dataKey="billed_energy"
            stroke="#16a34a"
            strokeWidth={4}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            name="Billed Energy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;