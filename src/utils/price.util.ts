export const getPriceAbbreviation = (price: number) => {
  if (price >= 50) {
    return "$$$$";
  } else if (price >= 20) {
    return "$$$";
  } else if (price >= 10) {
    return "$$";
  } else {
    return "$";
  }
};
