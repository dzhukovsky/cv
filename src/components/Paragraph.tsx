import {
  makeStyles,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';

export interface IParagraphProps {
  children: string;
  className?: string;
}

const useStyles = makeStyles({
  list: {
    ...shorthands.margin(0),
    paddingLeft: tokens.spacingHorizontalXL,
    listStyleType: "'•  '",
  },
});

export const Paragraph = (props: IParagraphProps) => {
  const styles = useStyles();
  const groups: string[][] = [];
  let buffer: string[] = [];

  props.children
    .trim()
    .split('\n')
    .forEach((item) => {
      item = item.trim();
      if (item.startsWith('-')) {
        buffer.push(item.substring(1).trim());
        return;
      }

      if (buffer.length > 0) {
        groups.push(buffer);
        buffer = [];
      }

      groups.push([item]);
    });

  if (buffer.length > 0) {
    groups.push(buffer);
  }

  return (
    <>
      {groups.map((rows, i) => (
        <Text className={props.className} key={i}>
          {rows.length > 1 ? (
            <ul className={styles.list}>
              {rows.map((row) => (
                <li key={row}>{row}</li>
              ))}
            </ul>
          ) : (
            rows[0]
          )}
        </Text>
      ))}
    </>
  );
};
