import React from 'react';
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
  Link,
  Button,
} from '@fluentui/react-components';
import { ArrowDownloadRegular, Mail24Regular } from '@fluentui/react-icons';
import { allTechnologies, data } from '@/data';
import { Paragraph, SectionFrame } from '@/components';
import { media } from '@/helpers/media';
import { useFlexStyles } from '@/hooks/FlexStyles';
import { Column } from '@/components/Flex/Column';
import { Row } from '@/components/Flex/Row';
import {
  Certification,
  Education,
  Project,
  SoftSkill,
} from '@/components/Sections';
import { downloadDocx } from '@/helpers/docx';
import { TechnologiesRadar } from '@/components/Sections/TechnologiesRadar';
import { Technologies } from '@/components/Sections/Technologies';
import { Metadata } from 'next';
import Head from 'next/head';

const useStyles = makeStyles({
  provider: {
    backgroundColor: tokens.colorNeutralBackground2,
    [media.print]: {
      backgroundColor: 'transparent',
    },
  },
  container: {
    paddingTop: `calc(${tokens.spacingVerticalXXL} * 2)`,
    rowGap: tokens.spacingVerticalXXXL,
    columnGap: tokens.spacingHorizontalXXXL,
    alignItems: 'stretch',
    [media.sm]: {
      ...shorthands.margin(0, tokens.spacingHorizontalS),
    },
    [media.md]: {
      ...shorthands.margin(0, tokens.spacingHorizontalL),
    },
    [media.lg]: {
      ...shorthands.margin(0, 'auto'),
      maxWidth: '968px',
    },
  },
  multiLine: {
    whiteSpace: 'pre-line',
  },
  avatarContainer: {
    rowGap: tokens.spacingVerticalXXXL,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [media.sm]: {
      ...shorthands.padding(tokens.spacingVerticalXXXL, 0, 0),
    },
    [media.lg]: {
      flexDirection: 'row',
    },
  },
  avatarContainerItems: {
    rowGap: tokens.spacingVerticalXXL,
    columnGap: tokens.spacingHorizontalXXL,
    alignItems: 'center',
    flexDirection: 'column',
    [media.md]: {
      flexDirection: 'row',
    },
    [media.lg]: {
      alignSelf: 'start',
    },
  },
  avatarActionItemsSm: {
    display: 'block',
    [media.md]: {
      display: 'none',
    },
  },
  avatarActionItemsMd: {
    display: 'none',
    [media.md]: {
      display: 'block',
    },
  },
  textAlignCenterSm: {
    textAlign: 'center',
    [media.md]: {
      textAlign: 'start',
    },
  },
  avatarImage: {
    boxShadow: tokens.shadow4,
    width: '150px',
    [media.md]: {
      alignSelf: 'start',
      marginTop: tokens.spacingVerticalL,
      width: '200px',
    },
  },
  summary: {
    rowGap: `var(${cardCSSVars.cardSizeVar})`,
    columnGap: `var(${cardCSSVars.cardSizeVar})`,
  },
  avatarItems: {
    rowGap: tokens.spacingVerticalXL,
    columnGap: tokens.spacingHorizontalXL,
  },
  avatarItemsRows: {
    alignItems: 'center',
    [media.md]: {
      alignItems: 'start',
    },
  },
  contact: {
    rowGap: tokens.spacingVerticalXS,
    columnGap: tokens.spacingHorizontalXS,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  languagesMd: {
    rowGap: tokens.spacingVerticalM,
    columnGap: tokens.spacingHorizontalM,
    display: 'none',
    [media.sm]: {
      display: 'flex',
    },
  },
  languagesSm: {
    display: 'flex',
    [media.sm]: {
      display: 'none',
    },
  },
  footer: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    ...shorthands.padding(
      tokens.spacingVerticalXL,
      0,
      tokens.spacingVerticalXL,
      0,
    ),
    rowGap: tokens.spacingVerticalXS,
    columnGap: tokens.spacingHorizontalXS,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

const title = `${data.fullName} ${data.lookingForPosition}`;

export default function IndexPage() {
  const styles = useStyles();
  const flex = useFlexStyles();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${data.lookingForPosition} ${
            data.location
          } ${data.contractTypes.join('/')}`}
        />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b51e153a-f932-4f11-b54b-55fe153bde03"
        ></script>
      </Head>
      <FluentProvider className={styles.provider} theme={webLightTheme}>
        <Column className={styles.container}>
          <Row className={styles.avatarContainer}>
            <Row className={styles.avatarContainerItems}>
              <Image
                className={styles.avatarImage}
                shape="circular"
                src="me.jpg"
              />
              <Column className={styles.avatarItems}>
                <Column className={styles.avatarItemsRows}>
                  <LargeTitle className={styles.textAlignCenterSm}>
                    {data.fullName}
                  </LargeTitle>
                  <Subtitle1 className={styles.textAlignCenterSm}>
                    {data.lookingForPosition}
                  </Subtitle1>
                  <Text>
                    {[data.location, data.contractTypes.join('/')].join(' · ')}
                  </Text>
                </Column>
                {!!(data.linkedInUrl ?? data.email) && (
                  <Column className={styles.avatarItemsRows}>
                    {!!data.linkedInUrl && (
                      <Link
                        className={mergeClasses(flex.row, styles.contact)}
                        href={`https://${data.linkedInUrl}`}
                        target="_blank"
                      >
                        <Image src="linkedin_logo.svg" />
                        <Text>{data.linkedInUrl}</Text>
                      </Link>
                    )}
                    {!!data.email && (
                      <Link
                        className={mergeClasses(flex.row, styles.contact)}
                        href={`mailto://${data.email}`}
                      >
                        <Mail24Regular />
                        <Text>{data.email}</Text>
                      </Link>
                    )}
                  </Column>
                )}
                <Column className={styles.avatarItemsRows}>
                  <Button
                    appearance="outline"
                    onClick={() => downloadDocx(data, title)}
                    icon={<ArrowDownloadRegular />}
                    size="medium"
                  >
                    Download as docx
                  </Button>
                </Column>
              </Column>
            </Row>
            <TechnologiesRadar technologies={allTechnologies} />
          </Row>
          <SectionFrame title="Summary">
            <Card>
              <div className={mergeClasses(flex.column, styles.summary)}>
                <Paragraph className={styles.multiLine}>
                  {data.summary ?? ''}
                </Paragraph>
              </div>
            </Card>
          </SectionFrame>
          <SectionFrame title="Technologies">
            <Technologies technologies={allTechnologies} />
          </SectionFrame>
          <SectionFrame title="Experience">
            {data.projects?.map((x, i) => (
              <Project key={i} {...x} />
            ))}
          </SectionFrame>
          <SectionFrame title="Languages">
            <Row className={styles.languagesMd}>
              {data.languages?.map((x, i) => (
                <Card key={i}>
                  <Text>
                    {x.name} - {x.level}
                  </Text>
                </Card>
              ))}
            </Row>
            <Card className={styles.languagesSm}>
              {data.languages?.map((x, i) => (
                <Text key={i}>
                  {x.name} - {x.level}
                </Text>
              ))}
            </Card>
          </SectionFrame>
          <SectionFrame title="Licenses & certifications">
            {data.certifications?.map((x, i) => (
              <Certification key={i} {...x} />
            ))}
          </SectionFrame>
          <SectionFrame title="Education">
            {data.educations?.map((x, i) => (
              <Education key={i} {...x} />
            ))}
          </SectionFrame>
          <SectionFrame title="Soft Skills">
            {data.softSkills?.map((x, i) => (
              <SoftSkill key={i} {...x} />
            ))}
          </SectionFrame>
        </Column>
        <Column className={styles.footer}>
          <span>
            Creation & design by{' '}
            <Link href="https://github.com/dzhukovsky" target="_blank">
              @dzhukovsky
            </Link>
          </span>
          <span>
            Text editing by{' '}
            <Link href="https://www.openai.com/chatgpt" target="_blank">
              @chatgpt
            </Link>
          </span>
        </Column>
      </FluentProvider>
    </>
  );
}
