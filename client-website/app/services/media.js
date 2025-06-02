const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addMedia = async (media) => {
  try {
    const response = await fetch(`${API_BASE_URL}/media`, {
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

export const getMediaByUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/media?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch media");
    return await response.json();
  } catch (error) {
    console.error("Error fetching media:", error);
    throw error;
  }
};


export const deleteMedia = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete media");
    return true;
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
};
