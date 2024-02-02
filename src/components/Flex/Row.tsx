import { mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { useFlexStyles } from '../cssinjs/Flex'

export type RowProps = Pick<React.HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'>

export const Row = (props: RowProps): React.JSX.Element => {
  const styles = useFlexStyles()
  return <div {...props} className={mergeClasses(styles.row, props.className)}></div>
}
