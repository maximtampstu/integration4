const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addMedia = async (media) => {
  try {
    const response = await fetch(`${API_BASE_URL}/art`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(media),
    });
    if (!response.ok) throw new Error("Failed to save media");
    return await response.json();
  } catch (error) {
    console.error("Error saving media:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getArtByEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/art?eventId=${eventId}`);
    if (!response.ok) throw new Error("Failed to fetch art for event");
    return await response.json();
  } catch (error) {
    console.error("Error fetching art:", error);
    return [];
  }
};

export const getArtById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/art/${id}`);
    if (!response.ok) throw new Error("Failed to fetch artwork");
    return await response.json();
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return null;
  }
};
