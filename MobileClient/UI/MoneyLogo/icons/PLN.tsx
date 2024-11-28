import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PLN = ({ width = 57, height = 57 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 57 57" fill="none">
    <Path fill="#DC143C" d="M0 28h57v13.5c0 8.284-6.716 15-15 15H15c-8.284 0-15-6.716-15-15V28Z" />
    <Path fill="#fff" d="M0 15C0 6.716 6.716 0 15 0h27c8.284 0 15 6.716 15 15v13.5H0V15Z" />
  </Svg>
);
