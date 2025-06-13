import supabase from "./supabase";

export const getVotableThemes = async () => {
  try {
    let { data, error } = await supabase
      .from("VotableThemes")
      .select("*")

    if (!error) {
      return data;
    } else {
      console.log(" get contact err", error);
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getThemeVotes = async () => {
  try {
    let { data, error } = await supabase
      .from("ThemeVotes")
      .select("*")

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

export const addThemeVote = async (themeId, email) => {
  try {
    const { data, error } = await supabase
      .from("ThemeVotes")
      .insert([{
        themeId: themeId,
        userEmail: email
      }])
      .select();

    return data[0];
  } catch (error) {
    console.error("Error adding theme vote:", error);
    throw error;
  }
}

export const getThemeById = async (themeId) => {
  try {
    let { data, error } = await supabase
      .from("VotableThemes")
      .select("*")
      .eq("id", themeId);

    if (!error) {
      if (data.length === 0) {
        return [];
      }
      return data[0];
    } else {
      console.log(" get contact err", error);
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};