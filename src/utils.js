const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "mxn",
  style: "currency",
  minimumFractionDigits: 0,
});

export { currencyFormatter };
