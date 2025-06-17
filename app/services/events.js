import supabase from "./supabase";

export const getAllEvents = async () => {
  try {
    let { data, error } = await supabase
      .from("Events")
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

export const getEventById = async (eventId) => {
  try {
    let { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("id", eventId)

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

export const getCurrentEvent = async () => {
  try {
    let { data, error } = await supabase
      .from("Events")
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

export const getPastEvents = async () => {
  try {
    let { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("current", false);

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

export const getEndDate = (dateStart) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(startDate);

  endDate.setDate(startDate.getDate() + 28); 

  const day = String(endDate.getDate()).padStart(2, '0');
  const month = String(endDate.getMonth() + 1).padStart(2, '0');
  const year = endDate.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getCountDownToParty = (dateStart) => {
  const endDate = new Date(getEndDate(dateStart));
  const now = new Date();

  const timeDiff = endDate - now;

  if (timeDiff < 0) {
    return {days: 0, hours: 0, minutes: 0};
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes } ;
};

export const getMonthByMonthValue = (monthValue) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return monthNames[monthValue - 1] || "Invalid month";
};

export const getMonthAndDayString = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${getMonthByMonthValue(month)}`;
};

export const getDateString = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${getMonthByMonthValue(month)} ${year}`;
};

export const getStartVotingDate = (dateStart) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(startDate);

  endDate.setDate(startDate.getDate() + 21);

  const day = String(endDate.getDate()).padStart(2, '0');
  const month = String(endDate.getMonth() + 1).padStart(2, '0');
  const year = endDate.getFullYear();
  return `${year}-${month}-${day}`;
};

//AI helped me a bit with this one
export const getPhaseStatus = (eventStartDate, phaseStartDay, phaseEndDay) => {
  const now = new Date();
  const startDate = new Date(eventStartDate);

  const phaseStartDate = new Date(startDate);
  phaseStartDate.setDate(startDate.getDate() + phaseStartDay);

  const phaseEndDate = new Date(startDate);
  phaseEndDate.setDate(startDate.getDate() + phaseEndDay);

  if (now < phaseStartDate) {
    const daysUntilStart = Math.ceil((phaseStartDate - now) / (1000 * 60 * 60 * 24));
    return `Phase starts in ${daysUntilStart} day(s)`;
  } else if (now >= phaseStartDate && now <= phaseEndDate) {
    const daysUntilEnd = Math.ceil((phaseEndDate - now) / (1000 * 60 * 60 * 24));
    return `Phase ends in ${daysUntilEnd} day(s)`;
  } else {
    return `Closed`;
  }
}

export const getCountdown = (endDateString) => {
  const now = new Date();
  const endDate = new Date(endDateString);
  const diffMs = endDate - now;

  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export const getEventDay = (startDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
}

export const getEndUploadingDate = (dateStart) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(startDate);

  endDate.setDate(startDate.getDate() + 17);

  const day = String(endDate.getDate()).padStart(2, '0');
  const month = String(endDate.getMonth() + 1).padStart(2, '0');
  const year = endDate.getFullYear();
  return `${year}-${month}-${day}`;
};


