import React from 'react'
import { Text } from '@fluentui/react-components'

export interface IParagraphProps {
  children: string
  className?: string
}

export const Paragraph = (props: IParagraphProps): React.JSX.Element => {
  const rows: string[] = [];
  let buffer = '';

  props.children
    .trim()
    .split('\n')
    .forEach((item) => {
      item = item.trim();
      if (item.startsWith("-")) {
        buffer += '\n' + item;
      }
      else {
        if (buffer.length > 0) {
          rows.push((rows.pop() + buffer).trim());
          buffer = '';
        }
        rows.push(item);
      }
    });

  if (buffer.length > 0) {
    rows.push(buffer)
  }

  return (<>
    {rows.map((x, i) => <Text className={props.className} key={i}>{x.trim()}</Text>)}
  </>)
}
