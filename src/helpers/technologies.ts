import { type Project, type Technology } from '~/types'
import { toDateDiff } from './date'

const getDate = (date: Date | string): Date | null => typeof date === 'string' ? null : date

export const getTechnologies = (projects: Project[]): Technology[] => {
  const currentDate = new Date()
  return projects.flatMap(project => (project.technologies ?? []).map((technology): Technology => {
    const lastDateUsed = technology.lastDateUsed ?? getDate(project.endDate) ?? currentDate
    const diff = toDateDiff(lastDateUsed, project.startDate)
    const expYears = technology.expYears ?? (diff.years + diff.months / 12)

    return {
      ...technology,
      expYears: technology.expYears ?? expYears,
      lastDateUsed
    }
  }))
}
