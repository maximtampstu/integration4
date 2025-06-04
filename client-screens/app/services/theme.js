export const getThemeVotes = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/themeVotes`
        );

        if (!response.ok) throw new Error("Failed to fetch parcels");

        return await response.json();
    } catch (error) {
        console.error("Error fetching folders:", error);
        throw error;
    }
};

export const addThemeVote = async (themeId, email) => {
    try {
      const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/themeVotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            themeId: themeId,
            userEmail: email
          }),
        }
      );
  
      if (!response.ok) throw new Error("Failed to create folder");
  
      return await response.json();
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
};

export const getThemeById = async (themeId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/current`
    );

    if (!response.ok) throw new Error("Failed to fetch notes");

    const data = await response.json();

    const theme = data.themes.find(t => t.id === Number(themeId));

    if (!theme) throw new Error("Theme not found");

    return theme;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};