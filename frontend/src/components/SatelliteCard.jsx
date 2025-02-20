const SatelliteCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-4 md:p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          {data.satName}
          <span className="text-sm bg-blue-600 px-3 py-1 rounded">
            ID: {data.satId}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Latitude</p>
          <p className="text-white text-2xl font-bold">
            {data.latitude.toFixed(4)}°
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Longitude</p>
          <p className="text-white text-2xl font-bold">
            {data.longitude.toFixed(4)}°
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Altitude</p>
          <p className="text-white text-2xl font-bold">
            {data.altitude.toFixed(2)} km
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Velocity</p>
          <p className="text-white text-2xl font-bold">
            {data.velocity.toFixed(1)} km/h
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Last Update</p>
          <p className="text-white">
            {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Next Pass</p>
          <p className="text-white">{data.nextPass}</p>
        </div>
      </div>
    </div>
  );
};

export default SatelliteCard;