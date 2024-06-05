import { animated } from '@react-spring/web';
import { FC } from 'react';

import { LineItemProps } from './LineItem.interface';

const LineItem: FC<LineItemProps> = ({ path, color }) => {
  return <animated.path d={path} fill={'none'} stroke={color} strokeWidth={2} />;
};

export default LineItem;
