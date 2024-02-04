import React from 'react'
import './App.scss'
import {
  FluentProvider,
  Subtitle1,
  Text,
  webLightTheme,
  makeStyles,
  tokens,
  shorthands,
  Card,
  Image,
  LargeTitle,
  cardCSSVars,
  mergeClasses,
  Link
} from '@fluentui/react-components'
import { SectionFrame } from './components/SectionFrame'
import meImage from '../public/me.jpg'
import { data } from './data'
import { Paragraph } from './components/Paragraph'
import { Certification } from './components/Sections/Certification'
import { Education } from './components/Sections/Education'
import { Project } from './components/Sections/Project'
import { Column } from './components/Flex/Column'
import { Row } from './components/Flex/Row'
import { Technologies } from './components/Sections/Technologies'
import { TechnologiesRadar } from './components/Sections/TechnologiesRadar'
import { useFlexStyles } from './components/cssinjs/Flex'
import { media, useCommonStyles } from './components/cssinjs/Common'
import linkedInLogo from '../public/linkedin_logo.svg'
import { Mail24Regular } from '@fluentui/react-icons'
import { SoftSkill } from './components/Sections/SoftSkill'
import { getTechnologies } from './helpers/technologies'
import { type Technology } from './types'

const useStyles = makeStyles({
  provider: {
    backgroundColor: tokens.colorNeutralBackground2
  },
  container: {
    ...shorthands.gap(tokens.spacingVerticalXXXL),
    ...shorthands.padding(tokens.spacingVerticalXXXL, 0, 0, 0),
    ...shorthands.margin(0),
    alignItems: 'stretch',
    [media.sm]: {
      ...shorthands.margin(0, tokens.spacingHorizontalS)
    },
    [media.md]: {
      ...shorthands.margin(0, tokens.spacingHorizontalL)
    },
    [media.lg]: {
      ...shorthands.margin(0, 'auto'),
      maxWidth: '968px'
    }
  },
  multiLine: {
    whiteSpace: 'pre-line'
  },
  avatarContainter: {
    ...shorthands.gap(tokens.spacingHorizontalXXL),
    ...shorthands.padding(tokens.spacingVerticalXL, 0, 0),
    [media.sm]: {
      ...shorthands.padding(tokens.spacingVerticalXXXL, 0, tokens.spacingVerticalXXL)
    },
    alignItems: 'center',
    flexDirection: 'column',
    [media.md]: {
      flexDirection: 'row'
    }
  },
  avatarImage: {
    boxShadow: tokens.shadow4,
    width: '150px',
    [media.md]: {
      width: '200px'
    }
  },
  summaryCard: {
    display: 'inline-grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    [media.lg]: {
      gridTemplateColumns: 'auto 400px'
    }
  },
  summary: {
    ...shorthands.gap(`var(${cardCSSVars.cardSizeVar})`)
  },
  avatarItems: {
    ...shorthands.gap(tokens.spacingVerticalXL)
  },
  avatarItemsRows: {
    alignItems: 'center',
    [media.md]: {
      alignItems: 'start'
    }
  },
  contact: {
    ...shorthands.gap(tokens.spacingVerticalXS),
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  languagesMd: {
    ...shorthands.gap(tokens.spacingVerticalM),
    display: 'none',
    [media.sm]: {
      display: 'flex'
    }
  },
  languagesSm: {
    display: 'flex',
    [media.sm]: {
      display: 'none'
    }
  },
  footer: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    ...shorthands.padding(tokens.spacingVerticalXL, 0, tokens.spacingVerticalXL, 0),
    ...shorthands.gap(tokens.spacingVerticalXS),
    textAlign: 'center',
    flexWrap: 'wrap'
  }
})

const setTitle = (text: string): void => {
  const title: HTMLTitleElement = document.querySelector('title') ?? document.createElement('title')
  title.textContent = text
  document.getElementsByTagName('head')[0].appendChild(title)
}
setTitle(`${data.fullName} • ${data.lookingForPosition}`)

export const App = (): React.JSX.Element => {
  const styles = useStyles()
  const common = useCommonStyles()
  const flex = useFlexStyles()

  const allTechnologies: Technology[] = [
    ...getTechnologies(data.projects?.slice().reverse() ?? []),
    ...data.technologies ?? []
  ]

  return (
        <FluentProvider className={styles.provider} theme={webLightTheme}>
            <Column className={styles.container}>
                <Row className={styles.avatarContainter}>
                    <Image
                        className={styles.avatarImage}
                        shape="circular"
                        src={meImage}
                    />
                    <Column className={styles.avatarItems}>
                        <Column className={styles.avatarItemsRows}>
                            <LargeTitle className={styles.textCenter}>{data.fullName}</LargeTitle>
                            <Subtitle1 className={styles.textCenter}>{data.lookingForPosition}</Subtitle1>
                            <Text>{[data.location, ...data.contractTypes].join(' · ')}</Text>
                        </Column>
                        {!!(data.linkedInUrl ?? data.email) &&
                            <Column className={styles.avatarItemsRows}>
                                {!!data.linkedInUrl &&
                                    <Link className={mergeClasses(flex.row, styles.contact)} href={`https://${data.linkedInUrl}`} target="_blank">
                                        <Image src={linkedInLogo} />
                                        <Text>{data.linkedInUrl}</Text>
                                    </Link>
                                }
                                {!!data.email &&
                                    <Link className={mergeClasses(flex.row, styles.contact)} href={`mailto://${data.email}`}>
                                        <Mail24Regular />
                                        <Text>{data.email}</Text>
                                    </Link>
                                }
                            </Column>
                        }

                    </Column>
                </Row>
                <SectionFrame title="Summary">
                    <Card className={mergeClasses(styles.summaryCard, common.printCard)}>
                        <div className={mergeClasses(flex.column, styles.summary)}>
                            <Paragraph>
                                {data.summary ?? ''}
                            </Paragraph>
                        </div>
                        <TechnologiesRadar technologies={allTechnologies} />
                    </Card>
                </SectionFrame>
                <SectionFrame title="Technologies">
                    <Technologies technologies={allTechnologies} />
                </SectionFrame>
                <SectionFrame title="Languages" >
                  <Row className={styles.languagesMd}>
                    {data.languages?.map((x, i) => <Card key={i} className={common.printCard}>
                        <Text>{x.name} - {x.level}</Text></Card>)}
                  </Row>
                  <Card className={mergeClasses(styles.languagesSm, common.printCard)}>
                    {data.languages?.map((x, i) => <Text key={i}>{x.name} - {x.level}</Text>)}
                  </Card>
                </SectionFrame>
                <SectionFrame title="Soft Skills">
                    {data.softSkills?.map((x, i) => <SoftSkill key={i} {...x} />)}
                </SectionFrame>
                <SectionFrame title="Licenses & certifications">
                    {data.certifications?.map((x, i) => <Certification key={i} {...x} />)}
                </SectionFrame>
                <SectionFrame title="Education">
                    {data.educations?.map((x, i) => <Education key={i} {...x} />)}
                </SectionFrame>
                <SectionFrame title="Experience">
                    {data.projects?.map((x, i) => <Project key={i} {...x} />)}
                </SectionFrame>
            </Column>
            <Column className={styles.footer}>
                <span>Creation & design by <Link href="https://github.com/dzhukovsky" target="_blank">@dzhukovsky</Link></span>
                <span>Text editing by <Link href="https://www.openai.com/chatgpt" target="_blank">@chatgpt</Link></span>
            </Column>
        </FluentProvider>
  )
}
