import {
  Title3,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { media } from '@/utils/media';
import { Column } from './Flex';

export interface ISectionFrameProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const useStyles = makeStyles({
  container: {
    rowGap: tokens.spacingVerticalL,
  },
  children: {
    rowGap: tokens.spacingVerticalM,
    width: '100%',
  },
  title: {
    ...shorthands.margin(0, tokens.spacingHorizontalM),
    [media.sm]: {
      ...shorthands.margin(0),
    },
  },
});

export const SectionFrame = (props: ISectionFrameProps) => {
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
