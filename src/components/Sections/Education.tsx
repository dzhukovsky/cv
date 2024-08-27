import React from 'react';
import {
  Card,
  Image,
  Link,
  Subtitle2,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import type * as t from '@/types';
import { media } from '@/helpers/media';

const useStyles = makeStyles({
  children: {
    ...shorthands.gap(tokens.spacingHorizontalM),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'start',
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
    [media.sm]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
});

export const Education = (props: t.Education): React.JSX.Element => {
  const styles = useStyles();

  return (
    <Card className={styles.children}>
      <Image src={props.schoolIconUrl} height={32} width={32} />
      <div className={styles.information}>
        <Link
          className={styles.title}
          appearance="subtle"
          href={props.schoolUrl}
          target="_blank"
        >
          <Subtitle2>{props.school}</Subtitle2>
        </Link>
        <div className={styles.content}>
          <Text>
            {[props.degree, props.fieldOfStudy].filter((x) => x).join(', ')}
          </Text>
          <Text>
            {[
              props.startDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              }),
              props.endDate?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              }),
            ]
              .filter((x) => x)
              .join(' - ')}
          </Text>
        </div>
      </div>
    </Card>
  );
};
