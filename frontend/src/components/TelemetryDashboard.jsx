// src/components/TelemetryDashboard.jsx
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TelemetryDashboard = ({ satelliteData }) => {
  const [telemetryHistory, setTelemetryHistory] = useState([]);

  useEffect(() => {
    if (satelliteData) {
      setTelemetryHistory(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          altitude: satelliteData.altitude,
          velocity: satelliteData.velocity
        }
      ].slice(-20)); // Keep last 20 readings
    }
  }, [satelliteData]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Telemetry Data</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={telemetryHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="altitude"
            stroke="#8884d8"
            name="Altitude (km)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="velocity"
            stroke="#82ca9d"
            name="Velocity (km/h)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TelemetryDashboard;