import React from 'react'
import { Text } from '@fluentui/react-components'

export interface IParagraphProps {
  children: string
  className?: string
}

export const Paragraph = (props: IParagraphProps): React.JSX.Element => {
  return (<>
        {props.children.trim().split('\n').map((x, i) => <Text className={props.className} key={i}>{x.trim()}</Text>)}
    </>)
}
