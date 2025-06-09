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


export const updateArt = async (art) => {
  const response = await fetch(`${API_BASE_URL}/art/${art.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(art),
  });
  if (!response.ok) throw new Error("Failed to update art");
  return await response.json();
};


export const uploadMediaToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file); 
  data.append("upload_preset", "media_upload_preset"); 

  const response = await fetch("https://api.cloudinary.com/v1_1/dngqj5iyc/auto/upload", {
    method: "POST",
    body: data,
  });

  if (!response.ok) throw new Error("Upload failed");
  return await response.json();
};
