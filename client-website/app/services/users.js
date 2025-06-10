import supabase from "./supabase";

export const getAllUsers = async () => {
  try {
    let { data, error } = await supabase
      .from("Users")
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

export const getCurrentUser = async () => {
    try {
        let { data, error } = await supabase
            .from("Users")
            .select("*")
            .eq("current", true)

        if (!error) {
            return data[0];
        } else {
            console.log(" get contact err", error);
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};

export const getUserById = async (userId) => {
  try {
    let { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("id", userId)

    if (!error) {
      return data[0];
    } else {
      console.log(" get contact err", error);
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};