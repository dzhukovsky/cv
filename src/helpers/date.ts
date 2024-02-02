export const MIN_DATE = new Date(0)
export const dateMax = (date1: Date, date2: Date): Date => date1 > date2 ? date1 : date2
export const dateMin = (date1: Date, date2: Date): Date => date1 < date2 ? date1 : date2
export const date = (date: string | number | Date): Date => new Date(date)

export const dateDiff = (a: Date, b: Date): {
  years: number
  months: number
  days: number
} => {
  const diff = new Date(a.getTime() - b.getTime())

  return {
    years: diff.getUTCFullYear() - 1970,
    months: diff.getUTCMonth(),
    days: diff.getUTCDate() - 1
  }
}
