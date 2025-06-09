const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllEvents = async () => {
  const res = await fetch(`${API_BASE_URL}/events`);
  return res.ok ? res.json() : [];
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
  const monthNames = ["January", "February", "March", "April", "May", "June" ,"July", "August", "September", "October", "November", "December"]
  return monthNames[monthValue - 1] || "Invalid month";
};

export const getMonthAndDayString = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${getMonthByMonthValue(month)}`;
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