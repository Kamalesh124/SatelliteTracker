const API_URL = import.meta.env.VITE_API_URL; // Using environment variable

export const fetchSatelliteData = async (satelliteId) => {
  try {
    const response = await fetch(`${API_URL}/${satelliteId}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  } catch (error) {
    console.error("Error fetching satellite data:", error);
    return null;
  }
};
