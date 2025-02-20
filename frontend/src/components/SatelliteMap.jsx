// src/components/SatelliteMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'path/to/marker-icon-2x.png',
  iconUrl: 'path/to/marker-icon.png',
  shadowUrl: 'path/to/marker-shadow.png',
});

const SatelliteMap = ({ satelliteData }) => {
  const position = [satelliteData.latitude, satelliteData.longitude];

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position}>
          <Popup>
            {satelliteData.satName}<br/>
            Altitude: {satelliteData.altitude} km
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SatelliteMap;