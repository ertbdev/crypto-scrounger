export const getNumberWithCommas = (value: number) => value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
