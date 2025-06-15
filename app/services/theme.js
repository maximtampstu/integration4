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

//AI helpt to not waste alot of time
export const getMostVotedThemeId = async (votes) => {
  const counts = {};

  votes.forEach(vote => {
    const id = vote.themeId;
    counts[id] = (counts[id] || 0) + 1;
  });

  let mostVoted = null;
  let maxVotes = 0;

  for (const id in counts) {
    if (counts[id] > maxVotes) {
      maxVotes = counts[id];
      mostVoted = Number(id);
    }
  }

  return mostVoted;
}

//used AI for less time lose
export const getVotePercentages = (votes) => {
  const totalVotes = votes.length;

  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote.themeId] = (acc[vote.themeId] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(voteCounts)
    .map(([themeId, count]) => ({
      themeId: Number(themeId),
      percentage: Math.round((count / totalVotes) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);
};
