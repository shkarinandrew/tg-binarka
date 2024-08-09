import { animated } from '@react-spring/web';
import { FC } from 'react';

import { LineItemProps } from './LineItem.interface';

const LineItem: FC<LineItemProps> = ({ fill = 'none', path, color }) => {
  return <animated.path d={path} fill={fill} stroke={color} strokeWidth={2} />;
};

export default LineItem;
