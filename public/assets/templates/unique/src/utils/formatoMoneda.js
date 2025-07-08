
export const formatoMoneda = (number) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 5,
  });

  return formatter.format(number);
};