import { media } from '@/utils/media';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  sm: {
    display: 'block',
    [media.md]: {
      display: 'none',
    },
  },
  smmd: {
    display: 'block',
    [media.lg]: {
      display: 'none',
    },
  },
  md: {
    display: 'none',
    [media.md]: {
      display: 'block',
    },
    [media.lg]: {
      display: 'none',
    },
  },
  mdlg: {
    display: 'none',
    [media.md]: {
      display: 'block',
    },
  },
  lg: {
    display: 'none',
    [media.lg]: {
      display: 'block',
    },
  },
});

export const Media = (props: {
  sm?: React.ReactNode;
  md?: React.ReactNode;
  lg?: React.ReactNode;
}) => {
  const styles = useStyles();
  const stylesMd = !props.lg ? styles.mdlg : styles.md;
  const stylesSm = !props.md ? undefined : styles.sm;

  return (
    <>
      {!!props.sm && <div className={stylesSm}>{props.sm}</div>}
      {!!props.md && <div className={stylesMd}>{props.md}</div>}
      {!!props.lg && <div className={styles.lg}>{props.lg}</div>}
    </>
  );
};
