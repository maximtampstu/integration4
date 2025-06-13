import supabase from "./supabase";

export const getArtById = async (artId) => {
    try {
        let { data, error } = await supabase
            .from("Art")
            .select("*")
            .eq("id", artId)

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

export const getArtTypeById = async (artTypeId) => {
  try {
    let { data, error } = await supabase
      .from("ArtTypes")
      .select("*")
      .eq("id", artTypeId)

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

export const getArtByEventId = async (eventId) => {
  try {
    let { data, error } = await supabase
      .from("Art")
      .select("*")
      .eq("eventId", eventId);

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

export const getUsersCurrentEventArt = async (eventId, userId) => {
  try {
    let { data, error } = await supabase
      .from("Art")
      .select("*")
      .eq("eventId", eventId)
      .eq("userId", userId);

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

export const getUsersPreviousEventsArt = async (eventId, userId) => {
  try {
    let { data, error } = await supabase
      .from("Art")
      .select("*")
      .lt("eventId", eventId)
      .eq("userId", userId);

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

export const getAllArtTypes = async () => {
  try {
    let { data, error } = await supabase
      .from("ArtTypes")
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

export const addArt = async (media) => {
  try {
    const { data, error } = await supabase
      .from("Art")
      .insert([media])
      .select();

    return data[0];
  } catch (error) {
    console.error("Error adding art:", error);
    throw error;
  }
}

export const updateArt = async (media, artId) => {
  try {
    const { data, error } = await supabase
      .from("Art")
      .update(media)
      .eq("id", artId)
      .select();

    return data[0];
  } catch (error) {
    console.error("Error updating art:", error);
    throw error;
  }
}

export const deleteArt = async (artId) => {
  try {
    const { data, error } = await supabase
      .from("Art")
      .delete()
      .eq("id", artId);

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

export const getCurrentEventSelectedArtByArtType = async (eventId, artTypeId) => {
  try {
    let { data, error } = await supabase
      .from("Art")
      .select("*")
      .eq("eventId", eventId)
      .eq("artTypeId", artTypeId)
      .eq("selected", true);

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

export const getCurrentEventSelectedArt = async (eventId) => {
  try {
    let { data, error } = await supabase
      .from("Art")
      .select("*")
      .eq("eventId", eventId)
      .eq("selected", true);

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

export const getArtVotes = async () => {
  try {
    let { data, error } = await supabase
      .from("ArtVotes")
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

export const addArtVote = async (artId, userId) => {
  try {
    const { data, error } = await supabase
      .from("ArtVotes")
      .insert([{
        artId: artId,
        userId: userId
      }])
      .select();

    return data[0];
  } catch (error) {
    console.error("Error adding art vote:", error);
    throw error;
  }
}

export const getArtAmount = async () => {
  try {
    const { count, error } = await supabase
      .from("Art")
      .select('*', { count: 'exact', head: true });

    return count;
  } catch (error) {
    console.error("Error adding art vote:", error);
    throw error;
  }
}


export const getAllArtworks = async () => {
  try {
    const { data, error } = await supabase
      .from("Art")
      .select("*");

    if (!error) {
      return data;
    } else {
      console.log("getAllArtworks error", error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching all artworks:", error);
    throw error;
  }
};

export const getTopTwoArtworks = (art, artVotes) => {
  const voteCount = {};
  artVotes.forEach(vote => {
    voteCount[vote.artId] = (voteCount[vote.artId] || 0) + 1;
  });

  const artWithVotes = art.map(a => ({
    ...a,
    _votes: voteCount[a.id] || 0
  }));

  const groupedByType = {};
  artWithVotes.forEach(art => {
    const type = art.artTypeId;
    if (!groupedByType[type]) groupedByType[type] = [];
    groupedByType[type].push(art);
  });

  const topArtworks = [];
  for (const type in groupedByType) {
    const top2 = groupedByType[type]
      .sort((a, b) => b._votes - a._votes)
      .slice(0, 2);
    topArtworks.push(...top2);
  }

  topArtworks.sort((a, b) => b._votes - a._votes);

  return topArtworks.map(({ _votes, ...rest }) => rest);
}

