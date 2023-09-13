export const roundAndMultipy = (data: any[], round: number, num: number) => {
  return Math.ceil(Math.max(...data) / round) * round * num;
};
