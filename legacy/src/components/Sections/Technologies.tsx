import {
  Card,
  makeStyles,
  Skeleton,
  SkeletonItem,
  tokens,
} from '@fluentui/react-components';
import Highcharts, {
  type PointOptionsObject,
  type XAxisBreaksOptions,
} from 'highcharts';
import BrokenAxis from 'highcharts/modules/broken-axis';
import HighchartsReact from 'highcharts-react-official';
import type * as t from '@/types';
import PatternFill from 'highcharts/modules/pattern-fill';
import Exporting from 'highcharts/modules/exporting';
import { type Series } from 'highcharts';
import {
  mapStackedTechnologies,
  sortStackedTechnologies,
} from '@/helpers/technologies';
import { toDateDiffWords, yearsToDateDiff } from '@/helpers/date';
import { hasWindow } from '@/utils/window';
import { type HTMLAttributes } from 'react';
import { useIsClient } from '@/hooks/useIsClient';

if (hasWindow()) {
  BrokenAxis(Highcharts);
  PatternFill(Highcharts);
  Exporting(Highcharts);
}

type BarSeries = Series & {
  group: {
    element: SVGGElement;
  };
};

const useStyles = makeStyles({
  skeleton: {
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
  },
  skeletonLegend: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalL,
    justifyContent: 'center',
    marginBottom: tokens.spacingVerticalL,
  },
  skeletonLegendItem: {
    display: 'grid',
    width: '200px',
    gridTemplateColumns: 'auto 1fr',
    columnGap: tokens.spacingHorizontalS,
  },
  skeletonBars: {
    display: 'grid',
    gridTemplateColumns: `max(18%, 50px) calc(85% - ${tokens.spacingVerticalS})`,
    marginTop: tokens.spacingVerticalXS,
    rowGap: tokens.spacingVerticalXS,
    columnGap: tokens.spacingHorizontalXS,
  },
});

export interface ITechnologiesProps {
  technologies?: t.Technology[];
}

function buildDateDiffText(years: number): string {
  const diff = yearsToDateDiff(years);
  const words = toDateDiffWords(diff);

  let result = '';
  if (diff.years > 0)
    result += `<span style="font-weight:${tokens.fontWeightBold}">${diff.years} ${words.years}</span>`;
  if (diff.months > 0)
    result += ` <span style="font-weight:${tokens.fontWeightBold}">${diff.months} ${words.months}</span>`;

  return result.trim();
}

const BarsSkeleton = ({
  values,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  values: number[];
}) => {
  return (
    <div {...props}>
      {Array.from({ length: values.length }).flatMap((_, i) => [
        <SkeletonItem key={i} shape="rectangle" size={16} />,
        <SkeletonItem
          key={values.length + i}
          shape="rectangle"
          size={16}
          style={{ width: `${values[i]}%` }}
        />,
      ])}
    </div>
  );
};

const LegendSkeleton = ({
  count,
  itemClassName,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  count: number;
  itemClassName: string;
}) => {
  return (
    <div {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={itemClassName}>
          <SkeletonItem shape="circle" size={12} />
          <SkeletonItem shape="rectangle" size={12} />
        </div>
      ))}
    </div>
  );
};

export const Technologies = (props: ITechnologiesProps) => {
  const styles = useStyles();
  const isClient = useIsClient();

  const groups = sortStackedTechnologies(
    mapStackedTechnologies(props.technologies ?? []),
  );

  const maxExpYears = Math.max(...groups.map((x) => x.maxExpYears)) * 1.05;

  const items = groups.flatMap((group) => group.technologies);
  const breaks: XAxisBreaksOptions[] = [];
  const seriesHeights: number[] = [];

  const colors: string[] = (
    (isClient ? Highcharts.getOptions().colors : []) ?? []
  ).filter((x) => typeof x === 'string') as string[];
  const { patterns = [] } = Highcharts as {
    patterns?: Highcharts.PatternOptionsObject[];
  };

  const options: Highcharts.Options = {
    title: { text: undefined },
    accessibility: { enabled: false },
    credits: { enabled: false },
    colors,
    exporting: { enabled: false },
    chart: {
      type: 'bar',
      height: Math.max(items.length, groups.length) * 20 + 100,
      style: {
        fontFamily: tokens.fontFamilyBase,
      },
    },
    legend: {
      verticalAlign: 'top',
      navigation: { enabled: false },
    },
    xAxis: {
      labels: {
        step: 1,
      },
      type: 'category',
    },
    yAxis: {
      endOnTick: false,
      title: {
        text: 'Total years of experience',
      },
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        borderWidth: 0,
        tooltip: {
          headerFormat: undefined,
          pointFormatter() {
            const dateDiffText = buildDateDiffText(this.y!);

            return `
              <span style="font-size: 1.2em;color:${this.color as string}">\u25CF</span>
              <span style="font-size: 0.9em;font-weight:${tokens.fontWeightBold}">${this.name} - ${this.series.name}</span>
              <br/>
              ${dateDiffText} of <span style="font-weight:${tokens.fontWeightBold}">${this.options.custom?.expSource}</span> experience, 
              last used in <span style="font-weight:${tokens.fontWeightBold}">${this.options.custom?.lastYearUsed}</span>
              <br/>`.trim();
          },
        },
        events: {
          legendItemClick: function () {
            const seriesHeight = (
              (this as BarSeries).group.element as SVGGElement
            ).getBBox().width;
            let chartHeight = this.chart.chartHeight;

            if (breaks[this.index]) {
              delete breaks[this.index];

              chartHeight += seriesHeights[this.index];
              delete seriesHeights[this.index];
            } else {
              breaks[this.index] = {
                from: this.data[0].x - 0.5,
                to: this.data.at(-1)!.x + 0.5,
                breakSize: 0,
              };
              seriesHeights[this.index] = seriesHeight;
              chartHeight -= seriesHeight;
            }

            this.chart.xAxis[0].update({
              breaks: Object.values(breaks),
            });

            this.chart.setSize(undefined, chartHeight);
          },
        },
      },
    },
    series: groups.map((group, groupIndex) => ({
      type: 'bar',
      name: group.name,
      pointPadding: 0.1,
      groupPadding: 0,
      data: group.technologies.flatMap((technology) =>
        technology.expYears.map(
          (
            expYear,
            expYearIndex,
          ): PointOptionsObject & {
            name: string;
            custom: { lastYearUsed: number; expSource: string };
            y: number;
          } => ({
            name: technology.name,
            y: expYear.years,
            custom: {
              lastYearUsed: technology.lastDateUsed.getFullYear(),
              expSource: expYear.source,
            },
            // colorIndex: 2,
            colorIndex: 0,
            color:
              expYearIndex > 0 || expYear.patternIndex
                ? {
                    pattern: {
                      ...patterns[
                        technology.expYears.length > 1
                          ? expYearIndex
                          : (expYear.patternIndex ?? expYearIndex)
                      ],
                      color: colors[groupIndex],
                    },
                  }
                : colors[groupIndex],
            dataLabels: {
              style: { color: 'black' },
              format: technology.lastDateUsed.getFullYear().toString(),
              enabled:
                technology.expYears.length === 1 ||
                expYearIndex === technology.expYears.length - 1,
              inside: false,
              align: 'left',
              verticalAlign: 'middle',
            },
          }),
        ),
      ),
    })),
  };
  return (
    (isClient && (
      <Card>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card>
    )) || (
      <Card>
        <Skeleton aria-label="Loading Content" className={styles.skeleton}>
          <LegendSkeleton
            className={styles.skeletonLegend}
            itemClassName={styles.skeletonLegendItem}
            count={groups.length}
          />
          {groups.map((group) => {
            return (
              <BarsSkeleton
                key={group.name}
                className={styles.skeletonBars}
                values={group.technologies.map(
                  (x) => (x.totalExpYears / maxExpYears) * 100,
                )}
              />
            );
          })}
        </Skeleton>
      </Card>
    )
  );
};
