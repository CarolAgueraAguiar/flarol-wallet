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

export const formatarDataTimeStamp = (dataOriginal: string): string => {
  const data = new Date(dataOriginal);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = String(data.getFullYear());

  return `${dia}/${mes}/${ano}`;
};

export const formatarData = (dataOriginal: string): string => {
  const partes = dataOriginal.split("-");
  if (partes.length === 3) {
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  } else {
    return "Data inválida";
  }
};

export const formatarDataParaEnvio = (dataOriginal: string): string => {
  const data = new Date(dataOriginal);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = String(data.getFullYear());

  return `${ano}-${mes}-${dia}`;
};

export const formatDateToYearMonthDay = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
  const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
  return `${year}-${month}-${day}`;
};
