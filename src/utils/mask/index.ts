export const formatNumber = (value: string) => {
  if (!value) return "";

  const numericValue = parseFloat(value.replace(/[^0-9]/g, ""));

  const formattedValue = `R$ ${numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  })}`;

  return formattedValue;
};

export const cleanNumber = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, "")) / 100;
  return numericValue.toFixed(2);
};
