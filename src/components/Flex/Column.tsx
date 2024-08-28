import { useFlexStyles } from '@/hooks/useFlexStyles';
import { mergeClasses } from '@fluentui/react-components';

export type ColumnsProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
>;

export const Column = (props: ColumnsProps) => {
  const styles = useFlexStyles();
  return (
    <div
      {...props}
      className={mergeClasses(styles.column, props.className)}
    ></div>
  );
};
