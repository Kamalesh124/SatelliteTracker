const SatelliteSidebar = ({ onSelectSatellite }) => {
    const satellites = {
      indian: [
        { id: 46494, name: "INSAT-3DS", desc: "Weather Satellite" },
        { id: 42034, name: "CARTOSAT-2F", desc: "Earth Observation" },
        { id: 41783, name: "CARTOSAT-2E", desc: "Earth Observation" },
        { id: 41948, name: "GSAT-17", desc: "Communication" },
        { id: 43042, name: "GSAT-11", desc: "Communication" },
        { id: 44804, name: "RISAT-2BR1", desc: "Radar Imaging" }
      ],
      international: [
        { id: 25544, name: "ISS (ZARYA)", desc: "International Space Station" },
        { id: 33591, name: "NOAA-19", desc: "Weather Satellite" },
        { id: 48274, name: "STARLINK-2525", desc: "Communication" },
        { id: 43013, name: "METOP-C", desc: "Weather Satellite" },
        { id: 40069, name: "ALOS-2", desc: "Earth Observation" }
      ]
    };
  
    return (
      <div className="w-64 h-screen bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 overflow-y-auto">
        {/* Indian Satellites Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">
            Indian Satellites
          </h2>
          <div className="space-y-2">
            {satellites.indian.map((sat) => (
              <button
                key={sat.id}
                onClick={() => onSelectSatellite(sat.id)}
                className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors group"
              >
                <p className="text-white font-medium">{sat.name}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{sat.desc}</span>
                  <span className="text-blue-400">ID: {sat.id}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
  
        {/* International Satellites Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">
            International Satellites
          </h2>
          <div className="space-y-2">
            {satellites.international.map((sat) => (
              <button
                key={sat.id}
                onClick={() => onSelectSatellite(sat.id)}
                className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors group"
              >
                <p className="text-white font-medium">{sat.name}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{sat.desc}</span>
                  <span className="text-blue-400">ID: {sat.id}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SatelliteSidebar;