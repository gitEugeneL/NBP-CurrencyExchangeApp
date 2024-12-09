import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const HistoryIcon = () => (
  <Svg width={24} height={24} fill="none">
    <Path
      stroke="#AFB2BF"
      strokeLinecap="round"
      strokeWidth={2}
      d="M16 3v3M8 3v3M7 21h10a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4Z"
    />
    <Rect width={8} height={3} x={8} y={13} stroke="#AFB2BF" strokeWidth={2} rx={1.5} />
  </Svg>
);
