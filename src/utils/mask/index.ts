export const formatNumber = (value: string) => {
  if (!value) return "";

  const numericValue = parseFloat(value.replace(",", "."));

  const formattedValue = `R$ ${numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return formattedValue;
};

export const cleanNumber = (value: number) => {
  return parseFloat(
    String(value)
      .replace(/[^0-9\,\.]/g, "")
      .replace(".", "")
      .replace(",", ".")
  );
};

export const cleanNumberNegative = (value: number) => {
  let amount = String(value);

  let numericValue = parseFloat(
    amount
      .replace(/[^0-9\,\.]/g, "")
      .replace(".", "")
      .replace(",", ".")
  );

  if (amount.includes("-")) {
    numericValue *= -1;
  }

  return -numericValue.toFixed(2);
};
