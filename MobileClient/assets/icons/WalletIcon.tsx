import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const WalletIcon = () => (
  <Svg width={24} height={24} fill="none">
    <Path
      fill="#AFB2BF"
      fillRule="evenodd"
      d="M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Zm16-2a2 2 0 0 1 2 2h-2a4 4 0 0 0 0 8h2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12Zm0 4h2v4h-2a2 2 0 1 1 0-4Zm0 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      clipRule="evenodd"
    />
  </Svg>
);
