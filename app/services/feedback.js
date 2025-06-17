import supabase from "./supabase";

export const getFeedbackByArtId = async (artId) => {
    try {
        let { data, error } = await supabase
            .from("Feedback")
            .select("*")
            .eq("artId", artId)

        if (!error) {
            if (data.length === 0) {
                return [];
            }
            return data;
        } else {
            console.log(" get contact err", error);
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};

export const addFeedback = async (artId, userId, feedback) => {
    try {
        const { data, error } = await supabase
            .from("Feedback")
            .insert([{
                artId: artId,
                userId: userId,
                feedback: feedback
            }])
            .select();

        return data[0];
    } catch (error) {
        console.error("Error adding feedback:", error);
        throw error;
    }
}

export const deleteArtFeedback = async (artId) => {
    const { error } = await supabase
    .from("Feedback") // replace with your actual table name if different
    .delete()
    .eq("artId", artId);

  if (error) {
    console.error("Error deleting feedback:", error);
  } else {
    console.log(`All feedback for artId ${artId} deleted successfully.`);
  }
}