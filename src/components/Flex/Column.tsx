import { useFlexStyles } from '@/hooks/FlexStyles';
import { mergeClasses } from '@fluentui/react-components';
import React from 'react';

export type ColumnsProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
>;

export const Column = (props: ColumnsProps): React.JSX.Element => {
  const styles = useFlexStyles();
  return (
    <div
      {...props}
      className={mergeClasses(styles.column, props.className)}
    ></div>
  );
};
