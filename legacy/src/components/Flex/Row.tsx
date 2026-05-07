import { useFlexStyles } from '@/hooks/useFlexStyles';
import { mergeClasses } from '@fluentui/react-components';

export type RowProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
>;

export const Row = (props: RowProps) => {
  const styles = useFlexStyles();
  return (
    <div {...props} className={mergeClasses(styles.row, props.className)}></div>
  );
};
