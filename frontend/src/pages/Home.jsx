// src/pages/Home.jsx
import { useState } from "react";
import { fetchSatelliteData } from "../services/api";
import SatelliteCard from "../components/SatelliteCard";
import SatelliteSidebar from "../components/SatelliteSidebar";
import SatelliteMap from "../components/SatelliteMap";
import TelemetryDashboard from "../components/TelemetryDashboard";
import PassPrediction from "../components/PassPrediction";

const Home = () => {
  const [satelliteId, setSatelliteId] = useState("");
  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!satelliteId) return;
    setLoading(true);
    try {
      const data = await fetchSatelliteData(satelliteId);
      setSatelliteData(data);
    } catch (error) {
      console.error("Error fetching satellite data:", error);
    }
    setLoading(false);
  };

  const handleSatelliteSelect = (id) => {
    setSatelliteId(id);
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="loader"></div>
        </div>
      )}

      <SatelliteSidebar onSelectSatellite={handleSatelliteSelect} />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Satellite Tracker</h1>

          {/* Search Section */}
          <div className="flex justify-center gap-3 mb-8">
            <input
              type="number"
              value={satelliteId}
              onChange={(e) => setSatelliteId(e.target.value)}
              placeholder="Enter Satellite ID"
              className="p-2 w-32 text-black rounded-lg bg-white"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {satelliteData && (
            <div className="space-y-6">
              <SatelliteCard data={satelliteData} />
              <SatelliteMap satelliteData={satelliteData} />
              <TelemetryDashboard satelliteData={satelliteData} />
              <PassPrediction satelliteId={satelliteData.satId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
