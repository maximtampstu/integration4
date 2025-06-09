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


export const getArtVotes = async () => {
  const response = await fetch(`${API_BASE_URL}/artVotes`);
  if (!response.ok) throw new Error("Failed to fetch votes");
  return await response.json();
};

export const addArtVote = async (vote) => {
  const response = await fetch(`${API_BASE_URL}/artVotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vote),
  });
  if (!response.ok) throw new Error("Failed to submit vote");
  return await response.json();
};


export const getArt = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/art`);
    if (!response.ok) throw new Error("Failed to fetch art");
    return await response.json();
  } catch (error) {
    console.error("Error fetching art:", error);
    throw error;
  }
};


export const deleteArt = async (artId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/art/${artId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!response.ok) throw new Error("Failed to delete artwork");
    return response;
  } catch (error) {
    console.error("Error deleting artwork:", error);
    throw error;
  }
};
