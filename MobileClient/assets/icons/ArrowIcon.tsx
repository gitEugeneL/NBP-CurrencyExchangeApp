import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowIcon = () => (
  <Svg width={24} height={24} fill="none">
    <Path
      stroke="#AFB2BF"
      strokeLinecap="round"
      strokeWidth={2}
      d="M18.923 7 22 10.077m0 0-3.077 3.077M22 10.077H11.231M5.077 10.077 2 13.154m0 0 3.077 3.077M2 13.154h10.769"
    />
  </Svg>
);
