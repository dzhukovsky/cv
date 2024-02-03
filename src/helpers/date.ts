export const MIN_DATE = new Date(0)
export const dateMax = (date1: Date, date2: Date): Date => date1 > date2 ? date1 : date2
export const dateMin = (date1: Date, date2: Date): Date => date1 < date2 ? date1 : date2
export const date = (date: string | number | Date): Date => new Date(date)

export const dateDiff = (a: Date, b: Date): {
  years: number
  months: number
} => {
  let years = a.getFullYear() - b.getFullYear()
  let months = a.getMonth() - b.getMonth()
  // const days = a.getDate() - b.getDate()

  // if (days > 0) {
  months++
  // }

  if (months < 0) {
    years--
    months += 12
  } else if (months >= 12) {
    years += Math.floor(months / 12)
    months = months % 12
  }

  return { years, months }
}
