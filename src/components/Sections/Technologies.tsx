import React from 'react'
import { Card, tokens } from '@fluentui/react-components'
import Highcharts, { type PointOptionsObject, type XAxisBreaksOptions } from 'highcharts'
import BrokenAxis from 'highcharts/modules/broken-axis'
import HighchartsReact from 'highcharts-react-official'
import type * as t from '~/types'
import { useCommonStyles } from '../cssinjs/Common'
import PatternFill from 'highcharts/modules/pattern-fill'
import { groupBy } from '../../helpers/object'
import { MIN_DATE, dateMax, toDateDiffWords, yearsToDateDiff } from '../../helpers/date'
BrokenAxis(Highcharts)
PatternFill(Highcharts)

interface IStackedTechnologyGroup {
  name: string
  shortName?: string
  technologies: IStackedTechnology[]
  lastDateUsed: Date
  minExpYears: number
  maxExpYears: number
}

interface IStackedTechnology {
  name: string
  expYears: IExpYears[]
  totalExpYears: number
  lastDateUsed: Date
}

interface IExpYears {
  years: number
  source: string
  patternIndex?: number
}

const mapStackedTechnologies = (technologies?: t.Technology[]): IStackedTechnologyGroup[] => {
  const groups = groupBy(technologies ?? [], x => x.group)
  const stackedGroups: IStackedTechnologyGroup[] = []
  for (const { key, values } of groups) {
    let stackedGroup = stackedGroups.find(x => (x.shortName ?? x.name) === (key.shortName ?? key.name))

    if (!stackedGroup) {
      stackedGroup = {
        name: key.name,
        shortName: key.shortName,
        technologies: [],
        lastDateUsed: MIN_DATE,
        minExpYears: 0,
        maxExpYears: 0
      }
      stackedGroups.push(stackedGroup)
    }

    for (const technology of values) {
      let stackedTechnology = stackedGroup.technologies.find(x => x.name === technology.name)

      if (!stackedTechnology) {
        stackedTechnology = {
          name: technology.name,
          expYears: [],
          lastDateUsed: MIN_DATE,
          totalExpYears: 0
        }
        stackedGroup.technologies.push(stackedTechnology)
      }

      stackedTechnology.totalExpYears += technology.expYears
      stackedTechnology.lastDateUsed = dateMax(stackedTechnology.lastDateUsed, technology.lastDateUsed)

      const expYear = stackedTechnology.expYears.find(x => x.source.localeCompare(technology.expSource, undefined, { sensitivity: 'accent' }) === 0)
      if (expYear) {
        expYear.years += technology.expYears
      } else {
        stackedTechnology.expYears.push({
          years: technology.expYears,
          source: technology.expSource,
          patternIndex: technology.patternIndex
        })
      }
    }
  }

  for (const stackedGroup of stackedGroups) {
    for (const stackedTechnology of stackedGroup.technologies) {
      stackedGroup.lastDateUsed = dateMax(stackedGroup.lastDateUsed, stackedTechnology.lastDateUsed)
      stackedGroup.minExpYears = stackedGroup.minExpYears
        ? Math.min(stackedGroup.minExpYears, stackedTechnology.totalExpYears)
        : stackedTechnology.totalExpYears
      stackedGroup.maxExpYears = stackedGroup.maxExpYears
        ? Math.max(stackedGroup.maxExpYears, stackedTechnology.totalExpYears)
        : stackedTechnology.totalExpYears
    }
  }

  return stackedGroups
}

const sortStackedTechnologies = (groups: IStackedTechnologyGroup[]): IStackedTechnologyGroup[] => {
  return groups
    .filter(group => group.technologies.length > 0)
    .map(group => {
      group.technologies = group.technologies
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => b.totalExpYears - a.totalExpYears)
        .sort((a, b) => +b.lastDateUsed - +a.lastDateUsed)
      return group
    })
    .sort((a, b) => b.technologies.length - a.technologies.length)
    .sort((a, b) => b.maxExpYears - a.maxExpYears)
    .sort((a, b) => +b.technologies[0].lastDateUsed - +a.technologies[0].lastDateUsed)
}

export interface ITechnologiesProps {
  technologies?: t.Technology[]
}

function buildDateDiffText (years: number): string {
  const diff = yearsToDateDiff(years)
  const words = toDateDiffWords(diff)

  let result = ''
  if (diff.years > 0) result += `<span style="font-weight:${tokens.fontWeightBold}">${diff.years} ${words.years}</span>`
  if (diff.months > 0) result += ` <span style="font-weight:${tokens.fontWeightBold}">${diff.months} ${words.months}</span>`

  return result.trim()
}

export const Technologies = (props: ITechnologiesProps): React.JSX.Element => {
  const common = useCommonStyles()
  const groups = sortStackedTechnologies(mapStackedTechnologies(props.technologies ?? []))
  const items = groups.flatMap(group => group.technologies)
  const breaks: XAxisBreaksOptions[] = []
  const seriesHeights: number[] = []

  const colors: string[] = (Highcharts.getOptions().colors ?? []).filter(x => typeof x === 'string') as string[]
  const patterns: Highcharts.PatternOptionsObject[] = (Highcharts as any).patterns ?? []

  const options: Highcharts.Options = {
    title: { text: undefined },
    accessibility: { enabled: false },
    credits: { enabled: false },
    colors,
    chart: {
      type: 'bar',
      height: Math.max(items.length, groups.length) * 20 + 100,
      style: {
        fontFamily: tokens.fontFamilyBase
      }
    },
    legend: {
      verticalAlign: 'top',
      navigation: { enabled: false }
    },
    xAxis: {
      labels: {
        step: 1
      },
      type: 'category'
    },
    yAxis: {
      endOnTick: false,
      title: {
        text: 'Total years of experience'
      }
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        borderWidth: 0,
        tooltip: {
          headerFormat: undefined,
          pointFormatter () {
            const dateDiffText = buildDateDiffText(this.y!)

            return `
              <span style="font-size: 1.2em;color:${this.color as string}">\u25CF</span>
              <span style="font-size: 0.9em;font-weight:${tokens.fontWeightBold}">${this.name} - ${this.series.name}</span>
              <br/>
              ${dateDiffText} of <span style="font-weight:${tokens.fontWeightBold}">${this.options.custom?.expSource}</span> experience, 
              last used in <span style="font-weight:${tokens.fontWeightBold}">${this.options.custom?.lastYearUsed}</span>
              <br/>`.trim()
          }
        },
        events: {
          legendItemClick: function () {
            const seriesHeight = ((this as any).group.element as SVGGElement).getBBox().width
            let chartHeight = this.chart.chartHeight

            if (breaks[this.index]) {
              delete breaks[this.index]

              chartHeight += seriesHeights[this.index]
              delete seriesHeights[this.index]
            } else {
              breaks[this.index] = {
                from: this.data[0].x - 0.5,
                to: this.data.at(-1)!.x + 0.5,
                breakSize: 0
              }
              seriesHeights[this.index] = seriesHeight
              chartHeight -= seriesHeight
            }

            this.chart.xAxis[0].update({
              breaks: Object.values(breaks)
            })

            this.chart.setSize(undefined, chartHeight)
          }
        }
      }
    },
    series: groups.map((group, groupIndex) => ({
      type: 'bar',
      name: group.name,
      pointPadding: 0.1,
      groupPadding: 0,
      data: group.technologies.flatMap(
        (technology) => technology.expYears.map(
          (expYear, expYearIndex): PointOptionsObject & {
            name: string
            custom: { lastYearUsed: number, expSource: string }
            y: number
          } => ({
            name: technology.name,
            y: expYear.years,
            custom: {
              lastYearUsed: technology.lastDateUsed.getFullYear(),
              expSource: expYear.source
            },
            // colorIndex: 2,
            colorIndex: 0,
            color: expYearIndex > 0 || expYear.patternIndex
              ? {
                  pattern: {
                    ...patterns[technology.expYears.length > 1 ? expYearIndex : expYear.patternIndex ?? expYearIndex],
                    color: colors[groupIndex]
                  }
                }
              : colors[groupIndex],
            dataLabels: {
              style: { color: 'black' },
              format: technology.lastDateUsed.getFullYear().toString(),
              enabled: technology.expYears.length === 1 || expYearIndex === technology.expYears.length - 1,
              inside: false,
              align: 'left',
              verticalAlign: 'middle'
            }
          })
        )
      )
    }))
  }
  return (<Card className={common.printCard}>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </Card>)
}
