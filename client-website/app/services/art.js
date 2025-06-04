const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllArtTypes = async () => {
  const res = await fetch(`${API_BASE_URL}/artTypes`);
  return res.ok ? res.json() : [];
};
