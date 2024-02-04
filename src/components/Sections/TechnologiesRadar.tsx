import React, { useEffect, useRef, useState } from 'react'
import Highcharts, { type PointOptionsObject } from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact, { type HighchartsReactRefObject } from 'highcharts-react-official'
import type * as t from '~/types'
import { makeStyles, shorthands, tokens } from '@fluentui/react-components'
import { type KeyValue, groupBy } from '../../helpers/object'
import { toDateDiff } from '../../helpers/date'
import Exporting from 'highcharts/modules/exporting'
import { renderSvg } from './Technologies'

HighchartsMore(Highcharts)
Exporting(Highcharts)

export interface ITechnologiesRadarProps {
  technologies?: t.Technology[]
}

const sum = (items: number[]): number => items.reduce((a, b) => a + b, 0)

const useStyles = makeStyles({
  root: {
    ...shorthands.margin('auto', 0)
  }
})

const getGroupRates = (groups: Array<KeyValue<t.TechnologyGroup, t.Technology>>): Array<{
  name: string
  rating: number
}> => {
  const exps = groups.map(({ key, values }) => {
    const rates = values.map(x => {
      const diff = toDateDiff(new Date(), x.lastDateUsed)
      return x.expYears / (diff.years + (diff.months / 12) + 1)
    })
    return {
      name: key.shortName ?? key.name,
      rating: Math.sqrt(sum(rates))
    }
  })

  const rateSum = sum(exps.map(x => x.rating))

  exps.forEach(x => {
    x.rating = +(x.rating / rateSum * 100).toFixed(2)
  })

  return exps.sort((a, b) => a.name.localeCompare(b.name))
}

export const TechnologiesRadar = (props: ITechnologiesRadarProps): React.JSX.Element => {
  const highChartsRef = useRef<HighchartsReactRefObject>(null)
  const [chartSvg, setChartSvg] = useState<string | undefined>()

  useEffect(() => {
    const handleBeforePrint = (): void => {
      const svg = highChartsRef.current?.chart.getSVG()
      setChartSvg(svg)
    }

    const handleAfterPrint = (): void => {
      setChartSvg(undefined)
    }

    window.addEventListener('beforeprint', handleBeforePrint)
    window.addEventListener('afterprint', handleAfterPrint)

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [])

  const styles = useStyles()
  const groups = groupBy(props.technologies ?? [], x => x.group)
  const rates = getGroupRates(groups)
  const maxRate = Math.max(...rates.map(x => x.rating))

  const options: Highcharts.Options = {
    chart: {
      marginTop: 2,
      marginBottom: 2,
      polar: true,
      type: 'line',
      height: 350,
      style: {
        fontFamily: tokens.fontFamilyBase
      }
    },
    exporting: { enabled: false },
    title: { text: undefined },
    credits: { enabled: false },
    accessibility: { enabled: false },
    pane: {
      size: '80%'
    },
    legend: { enabled: false },
    xAxis: {
      type: 'category',
      tickmarkPlacement: 'on',
      lineWidth: 0
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      max: maxRate,
      labels: {
        align: 'center',
        formatter: function () {
          return this.value + '%'
        }
      },
      title: { text: undefined }
    },
    tooltip: {
      headerFormat: undefined,
      pointFormatter: function () {
        return `
                    <span style="color:${this.series.color as string}">\u25CF</span>
                    ${this.name}
                    <span style="font-size: 0.9em;font-weight:${tokens.fontWeightBold}">${+this.y!.toFixed(1)}%</span>
                    `.trim()
      }
    },
    series: [{
      type: 'area',
      fillOpacity: 0.2,
      data: rates.map((rate): PointOptionsObject => ({
        name: rate.name,
        y: rate.rating
      })),
      pointPlacement: 'on'
    }],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            chart: {
              height: '70%'
            },
            pane: {
              size: '80%'
            }

          }
        },
        {
          condition: {
            maxWidth: 300
          },
          chartOptions: {
            chart: {
              height: '70%'
            },
            pane: {
              size: '70%'
            }

          }
        }
      ]
    }
  }

  return (
        <div className={styles.root}>
            {renderSvg(chartSvg) ?? <HighchartsReact ref={highChartsRef}
                        highcharts={Highcharts}
                        options={options}
              />}
        </div>
  )
}
