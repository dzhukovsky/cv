import React from 'react'
import { Card, Divider, Image, Link, Subtitle2, Tag, TagGroup, Text, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components'
import type * as t from '~/types'
import { Paragraph } from '../Paragraph'
import { media, useCommonStyles } from '../cssinjs/Common'
import { toDateDiff, toDateDiffWords } from '../../helpers/date'
import { Column } from '../Flex/Column'
import { formatDates } from './../../data'

const useStyles = makeStyles({
  company: {
    ...shorthands.gap(tokens.spacingHorizontalS),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'start'
  },
  children: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    ...shorthands.gap(tokens.spacingHorizontalS),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  multiLine: {
    whiteSpace: 'pre-line'
  },
  list: {
    ...shorthands.margin(0),
    paddingLeft: tokens.spacingHorizontalXL,
    listStyleType: 'disc'
  },
  tagsMd: {
    display: 'none',
    [media.md]: {
      display: 'inline-flex'
    }
  },
  tagsSm: {
    ...shorthands.padding(tokens.spacingVerticalXS, 0, 0, 0),
    display: 'inline-flex',
    [media.md]: {
      display: 'none'
    },
    '& span': {
      ...shorthands.padding(0),
      ...shorthands.border(0),
      height: 'unset'
    },
    '& > span': {
      ...shorthands.padding(0, tokens.spacingHorizontalXS)
    }
  }
})

function buildDateDiffText(startDate: Date, endDate: Date): string {
  const diff = toDateDiff(endDate, startDate)
  const words = toDateDiffWords(diff)

  let result = ''
  if (diff.years > 0) result += ` · ${diff.years} ${words.years}`
  if (diff.months > 0) result += ` · ${diff.months} ${words.months}`

  return result.trim()
}

export const Project = (props: t.Project): React.JSX.Element => {
  const styles = useStyles()
  const common = useCommonStyles()

  const endDate = typeof props.endDate !== 'string'
    ? props.endDate
    : new Date()

  return (
    <div>
      <div></div> {/* This div is necessary to avoid a bug in the print mode when card content breaks to new page without card border */}
      <Card className={mergeClasses(styles.children, common.printCard)}>
        <div className={mergeClasses(styles.title, common.noBreakBefore, common.noBreak)}>
          <Column>
            <Subtitle2>{props.position} | {props.name}</Subtitle2>
            <Text>
              {formatDates(props.startDate, props.endDate)} {buildDateDiffText(props.startDate, endDate)}
            </Text>
            <TagGroup className={styles.tagsSm}>
              {props.areasOfActivity.sort().map(x => <Tag key={x} appearance="brand">{x}</Tag>)}
            </TagGroup>
          </Column>
          <TagGroup className={styles.tagsMd}>
            {props.areasOfActivity.sort().map(x => <Tag key={x} appearance="brand">{x}</Tag>)}
          </TagGroup>
        </div>
        <Link appearance="subtle" className={mergeClasses(styles.company, common.noBreakBefore)} href={props.companyUrl} target="_blank">
          <Image
            src={props.companyIconUrl}
            height={24}
            width={24}
          />
          <Text>{props.company}</Text>
        </Link>
        <Paragraph className={styles.multiLine}>
          {props.description ?? ''}
        </Paragraph>
        {props.myRole?.length && <>
          <Divider>My Role</Divider>
          <Text className={common.noBreakBefore}>
            <ul className={styles.list}>
              {(props.myRole ?? '').trim().split('\n').map(x => <li key={x}>{x.trim()}</li>)}
            </ul>
          </Text>
        </>}
        {!!props.technologies?.length && <>
          <Divider>Skills</Divider>
          <Text className={common.noBreakBefore}>{props.technologies.map(x => x.name).sort().join(' · ')}</Text>
        </>}
      </Card>
    </div>
  )
}
