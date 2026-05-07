export const MIN_DATE = new Date(0);
export const dateMax = (date1: Date, date2: Date): Date =>
  date1 > date2 ? date1 : date2;
export const dateMin = (date1: Date, date2: Date): Date =>
  date1 < date2 ? date1 : date2;
export const date = (date: string | number | Date): Date => new Date(date);

export interface DateDiff {
  years: number;
  months: number;
}

export const toDateDiff = (a: Date, b: Date): DateDiff => {
  let years = a.getFullYear() - b.getFullYear();
  let months = a.getMonth() - b.getMonth();

  months++;

  if (months < 0) {
    years--;
    months += 12;
  } else if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }

  return { years, months };
};

export const yearsToDateDiff = (years: number): DateDiff => {
  const fullYears = Math.floor(years);
  const months = Math.round((years - fullYears) * 12);

  return { years: fullYears, months };
};

export const toDateDiffWords = (
  diff: DateDiff,
): {
  years: string;
  months: string;
} => {
  const yearWord = diff.years > 0 ? (diff.years === 1 ? 'yr' : 'yrs') : '';
  const monthWord = diff.months > 0 ? (diff.months === 1 ? 'mo' : 'mos') : '';
  return {
    years: yearWord,
    months: monthWord,
  };
};

export const toDateDiffFullWords = (
  diff: DateDiff,
): {
  years: string;
  months: string;
} => {
  const yearWord = diff.years > 0 ? (diff.years === 1 ? 'year' : 'years') : '';
  const monthWord =
    diff.months > 0 ? (diff.months === 1 ? 'month' : 'months') : '';
  return {
    years: yearWord,
    months: monthWord,
  };
};
