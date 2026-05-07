import { Project, Technology } from '@/types';
import { groupBy } from '@/utils/object';
import { dateMax, MIN_DATE, toDateDiff } from './date';

interface IStackedTechnologyGroup {
  name: string;
  shortName?: string;
  technologies: IStackedTechnology[];
  lastDateUsed: Date;
  minExpYears: number;
  maxExpYears: number;
}

interface IStackedTechnology {
  name: string;
  expYears: IExpYears[];
  totalExpYears: number;
  lastDateUsed: Date;
}

interface IExpYears {
  years: number;
  source: string;
  patternIndex?: number;
}

const distinctTechnologiesByMonth = (
  technologies: Technology[],
): Technology[] => {
  const distinctMap = new Map<string, Technology>();
  for (const technology of technologies) {
    const key = `${technology.name}-${technology.lastDateUsed.getFullYear()}-${technology.lastDateUsed.getMonth()}`;
    if (!distinctMap.has(key)) {
      distinctMap.set(key, technology);
    }
  }
  return Array.from(distinctMap.values());
};

export const getTechnologies = (projects: Project[]): Technology[] => {
  const currentDate = new Date();
  const technologies = projects.flatMap((project) =>
    (project.technologies ?? []).map((technology): Technology => {
      const lastDateUsed =
        technology.lastDateUsed ?? project.endDate ?? currentDate;
      const diff = toDateDiff(lastDateUsed, project.startDate);
      const expYears = technology.expYears ?? diff.years + diff.months / 12;

      return {
        ...technology,
        expYears: technology.expYears ?? expYears,
        lastDateUsed,
      };
    }),
  );
  return distinctTechnologiesByMonth(technologies);
};

export const mapStackedTechnologies = (
  technologies?: Technology[],
): IStackedTechnologyGroup[] => {
  const groups = groupBy(technologies ?? [], (x) => x.group);
  const stackedGroups: IStackedTechnologyGroup[] = [];
  for (const { key, values } of groups) {
    let stackedGroup = stackedGroups.find(
      (x) => (x.shortName ?? x.name) === (key.shortName ?? key.name),
    );

    if (!stackedGroup) {
      stackedGroup = {
        name: key.name,
        shortName: key.shortName,
        technologies: [],
        lastDateUsed: MIN_DATE,
        minExpYears: 0,
        maxExpYears: 0,
      };
      stackedGroups.push(stackedGroup);
    }

    for (const technology of values) {
      let stackedTechnology = stackedGroup.technologies.find(
        (x) => x.name === technology.name,
      );

      if (!stackedTechnology) {
        stackedTechnology = {
          name: technology.name,
          expYears: [],
          lastDateUsed: MIN_DATE,
          totalExpYears: 0,
        };
        stackedGroup.technologies.push(stackedTechnology);
      }

      stackedTechnology.totalExpYears += technology.expYears;
      stackedTechnology.lastDateUsed = dateMax(
        stackedTechnology.lastDateUsed,
        technology.lastDateUsed,
      );

      const expYear = stackedTechnology.expYears.find(
        (x) =>
          x.source.localeCompare(technology.expSource, undefined, {
            sensitivity: 'accent',
          }) === 0,
      );
      if (expYear) {
        expYear.years += technology.expYears;
      } else {
        stackedTechnology.expYears.push({
          years: technology.expYears,
          source: technology.expSource,
          patternIndex: technology.patternIndex,
        });
      }
    }
  }

  for (const stackedGroup of stackedGroups) {
    for (const stackedTechnology of stackedGroup.technologies) {
      stackedGroup.lastDateUsed = dateMax(
        stackedGroup.lastDateUsed,
        stackedTechnology.lastDateUsed,
      );
      stackedGroup.minExpYears = stackedGroup.minExpYears
        ? Math.min(stackedGroup.minExpYears, stackedTechnology.totalExpYears)
        : stackedTechnology.totalExpYears;
      stackedGroup.maxExpYears = stackedGroup.maxExpYears
        ? Math.max(stackedGroup.maxExpYears, stackedTechnology.totalExpYears)
        : stackedTechnology.totalExpYears;
    }
  }

  return stackedGroups;
};

export const sortStackedTechnologies = (
  groups: IStackedTechnologyGroup[],
): IStackedTechnologyGroup[] => {
  return groups
    .filter((group) => group.technologies.length > 0)
    .map((group) => {
      group.technologies = group.technologies
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => +b.lastDateUsed - +a.lastDateUsed)
        .sort((a, b) => b.totalExpYears - a.totalExpYears);
      return group;
    })
    .sort((a, b) => b.technologies.length - a.technologies.length)
    .sort((a, b) => b.maxExpYears - a.maxExpYears)
    .sort((a, b) => +b.lastDateUsed - +a.lastDateUsed);
};
