import React from 'react'
import { makeStyles, shorthands, Text, tokens } from '@fluentui/react-components'

export interface IParagraphProps {
  children: string
  className?: string
}


const useStyles = makeStyles({
  list: {
    ...shorthands.margin(0),
    paddingLeft: tokens.spacingHorizontalXL,
    listStyleType: "'•  '"
  },
})


export const Paragraph = (props: IParagraphProps): React.JSX.Element => {
  var styles = useStyles()
  const groups: string[][] = [];
  let buffer: string[] = [];

  props.children
    .trim()
    .split('\n')
    .forEach((item) => {
      item = item.trim();
      if (item.startsWith("-")) {
        buffer.push(item.substring(1).trim());
        return;
      }

      groups.push([...buffer, item]);
      buffer = [];
    });

  if (buffer.length > 0) {
    groups.push(buffer);
  }

  return (<>
    {groups.map((rows, i) => <Text className={props.className} key={i}>
      {rows.length > 1 ? <ul className={styles.list}>{rows.map(row => <li key={row}>{row}</li>)}</ul> : rows[0]}
    </Text>)}
  </>)
}
