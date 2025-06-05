const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
};


export const addUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Failed to add user");
  return await response.json();
};


export const getUserById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch habit");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching habit:", error);
    return null;
  }
};
