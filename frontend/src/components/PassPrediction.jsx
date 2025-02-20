import { useState } from "react";

const PassPrediction = ({ satelliteId }) => {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [predictions, setPredictions] = useState([]);
  const [passCount, setPassCount] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/predictPasses?satelliteId=${satelliteId}&lat=${location.lat}&lng=${location.lng}`
      );

      if (!response.ok) throw new Error("Failed to fetch pass data");

      const data = await response.json();

      setPredictions(data.passes || []);
      setPassCount(data.passcount !== undefined ? data.passcount : (data.passes ? data.passes.length : 0));

    } catch (error) {
      console.error("Error fetching pass predictions:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Pass Predictions</h3>
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          placeholder="Latitude"
          value={location.lat}
          onChange={(e) => setLocation((prev) => ({ ...prev, lat: e.target.value }))}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={location.lng}
          onChange={(e) => setLocation((prev) => ({ ...prev, lng: e.target.value }))}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handlePredict}
          className="bg-blue-600 px-4 rounded hover:bg-blue-700"
        >
          Predict Passes
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}

      {passCount !== null && <p className="text-white mb-4">Pass Count: {passCount}</p>}

      {predictions.length > 0 ? (
        <div className="space-y-2">
          {predictions.map((pass, index) => (
            <div key={index} className="bg-gray-700/50 p-3 rounded">
              <p className="text-white">
                Start: {new Date(pass.startUTC * 1000).toLocaleString()}
              </p>
              <p className="text-white">Duration: {pass.duration} seconds</p>
              <p className="text-white">Max Elevation: {pass.maxEl}°</p>
            </div>
          ))}
        </div>
      ) : (
        passCount === 0 && <p className="text-white">No pass predictions available.</p>
      )}
    </div>
  );
};

export default PassPrediction;
