
export const formatCurrency = (number) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
};

// Mantener compatibilidad con el nombre anterior
export const formatoMoneda = formatCurrency;