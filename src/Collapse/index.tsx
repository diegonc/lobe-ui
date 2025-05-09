'use client';

import { Collapse as AntdCollapse, CollapseProps as AntdCollapseProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import { memo } from 'react';

import Icon from '@/Icon';

import { useStyles } from './style';

export type Variant = 'default' | 'block' | 'ghost' | 'pure';

export interface CollapseProps extends Omit<AntdCollapseProps, 'collapsible'> {
  collapsible?: boolean;
  gap?: number;
  padding?:
    | number
    | string
    | {
        body?: number | string;
        header?: number | string;
      };
  variant?: Variant;
}

const Collapse = memo<CollapseProps>(
  ({ style, variant = 'default', gap = 0, className, padding, collapsible = true, ...rest }) => {
    const bodyPadding = typeof padding === 'object' ? padding.body : padding;
    const headerPadding = typeof padding === 'object' ? padding.header : padding;

    const { cx, styles } = useStyles({
      bodyPadding,
      headerPadding,
      isSplit: !!gap,
    });

    const variantStyle = cx(
      variant === 'default' && styles.defaultStyle,
      variant === 'block' && styles.blockStyle,
      variant === 'ghost' && styles.ghostStyle,
      variant === 'pure' && styles.pureStyle,
    );

    return (
      <AntdCollapse
        bordered={!gap && (variant === 'default' || variant === 'ghost')}
        className={cx(
          styles.group,
          !collapsible && styles.hideCollapsibleIcon,
          variantStyle,
          className,
        )}
        collapsible={collapsible ? 'header' : 'icon'}
        expandIcon={({ isActive }) => (
          <Icon
            className={styles.icon}
            icon={ChevronDown}
            size={{ fontSize: 16 }}
            style={isActive ? {} : { rotate: '-90deg' }}
          />
        )}
        style={{
          gap,
          ...style,
        }}
        {...rest}
      />
    );
  },
);

export default Collapse;
