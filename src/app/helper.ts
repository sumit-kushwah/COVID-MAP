export function numberWithCommas(x: number):any {
  return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}
