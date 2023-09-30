export const formatCurrentDate = (): string => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const currentDate = new Date();
  const monthAbbreviation = months[currentDate.getMonth()];
  const day = currentDate.getDate();

  return `${monthAbbreviation}, ${day}`;
};
