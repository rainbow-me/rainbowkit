export function hasSubArray(master: string[], sub: string[]) {
  return sub.some(
    (
      (i) => (v: string) =>
        (i = master.indexOf(v, i) + 1)
    )(0)
  )
}

export const findInSubArray = (master: string[], sub: string[]) => {
  return master.indexOf(master.find((x) => sub.includes(x)))
}
