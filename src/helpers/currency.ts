export const numberFormarCentsBR = (number: number) => {
  return Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  }).format(number / 100);
};
