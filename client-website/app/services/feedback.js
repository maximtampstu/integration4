export const getFeedbackByArtId = async (artId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/feedback?artId=${artId}`
        );

        if (!response.ok) throw new Error("Failed to fetch notes");

        return await response.json();
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
      }
};

export const addFeedback = async (artId, userId, feedback) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/feedback`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    artId: artId,
                    userId: userId,
                    feedback: feedback
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