import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const TrackerIcon = () => (
  <Svg width={24} height={24} fill="none">
    <Path
      stroke="#AFB2BF"
      strokeLinecap="round"
      strokeWidth={2}
      d="M16 11v5m-8-5v5m4-8v8m-5 5h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4Z"
    />
  </Svg>
);
