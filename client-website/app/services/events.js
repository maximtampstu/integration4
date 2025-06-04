const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllEvents = async () => {
  const res = await fetch(`${API_BASE_URL}/events`);
  return res.ok ? res.json() : [];
};
