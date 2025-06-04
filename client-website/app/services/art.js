const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllArtTypes = async () => {
  const res = await fetch(`${API_BASE_URL}/artTypes`);
  return res.ok ? res.json() : [];
};

export const getArtTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/artTypes`);
    if (!response.ok) throw new Error("Failed to fetch art types");
    return await response.json();
  } catch (error) {
    console.error("Error fetching art types:", error);
    throw error;
  }
};

export const getCurrentEventData = async () => {
  const res = await fetch(`${API_BASE_URL}/current`);
  if (!res.ok) throw new Error("Failed to fetch current voting data");
  return res.json();
};
