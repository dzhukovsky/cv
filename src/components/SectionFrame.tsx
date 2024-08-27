import React from 'react';
import {
  Title3,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { media } from '@/helpers/media';
import { Column } from './Flex/Column';

export interface ISectionFrameProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const useStyles = makeStyles({
  container: {
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  children: {
    ...shorthands.gap(tokens.spacingVerticalM),
    width: '100%',
  },
  title: {
    ...shorthands.margin(0, tokens.spacingHorizontalM),
    [media.sm]: {
      ...shorthands.margin(0),
    },
  },
});

export const SectionFrame = (props: ISectionFrameProps): React.JSX.Element => {
  const styles = useStyles();

  return (
    <Column className={styles.container}>
      {props.title && <Title3 className={styles.title}>{props.title}</Title3>}
      <Column className={mergeClasses(styles.children, props.className)}>
        {props.children}
      </Column>
    </Column>
  );
};
