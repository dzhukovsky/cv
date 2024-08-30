import { media } from '@/utils/media';
import './+Page.scss';
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
import { useFlexStyles } from '@/hooks/useFlexStyles';
import { Column, Row } from '@/components/Flex';
import { allTechnologies, data, metadata } from '@/data';
import { downloadDocx } from '@/helpers/docxExport';
import {
  Certification,
  Education,
  Project,
  SoftSkill,
  Technologies,
  TechnologiesRadar,
} from '@/components/Sections';
import { Paragraph, SectionFrame } from '@/components';

const useStyles = makeStyles({
  provider: {
    backgroundColor: tokens.colorNeutralBackground2,
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

export const Page = () => {
  const styles = useStyles();
  const flex = useFlexStyles();

  return (
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
                  {[
                    `${data.address.locality}, ${data.address.country}`,
                    data.contractTypes.join('/'),
                  ].join(' · ')}
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
                  onClick={() => downloadDocx(data, metadata.title)}
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
          {data.projects?.map((x, i) => <Project key={i} {...x} />)}
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
          {data.certifications?.map((x, i) => <Certification key={i} {...x} />)}
        </SectionFrame>
        <SectionFrame title="Education">
          {data.educations?.map((x, i) => <Education key={i} {...x} />)}
        </SectionFrame>
        <SectionFrame title="Soft Skills">
          {data.softSkills?.map((x, i) => <SoftSkill key={i} {...x} />)}
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
  );
};
