export const getCurrent = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/current`
        );

        if (!response.ok) throw new Error("Failed to fetch parcels");

        return await response.json();
    } catch (error) {
        console.error("Error fetching folders:", error);
        throw error;
    }
};