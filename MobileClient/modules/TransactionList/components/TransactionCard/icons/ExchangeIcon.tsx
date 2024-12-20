import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const ExchangeIcon = () => (
  <Svg width={45} height={45} fill="none">
    <Rect width={45} height={45} fill="#2B2A3A" rx={22.5} />
    <Path
      fill="#A6A9AA"
      fillOpacity={0.65}
      d="M18.011 12.822a9.837 9.837 0 0 1 7.477 0 9.732 9.732 0 0 1 3.554 2.481l-3.27 3.223h6.551V12.07l-2.143 2.112a11.516 11.516 0 0 0-12.786-2.827 11.364 11.364 0 0 0-4.655 3.508 11.207 11.207 0 0 0-2.24 5.145l1.594.244c.528-3.355 2.74-6.132 5.918-7.43ZM17.395 32.14a11.459 11.459 0 0 0 8.71 0 11.362 11.362 0 0 0 4.655-3.508A11.204 11.204 0 0 0 33 23.487l-1.593-.244c-.528 3.355-2.74 6.132-5.918 7.43a9.836 9.836 0 0 1-7.478 0 9.733 9.733 0 0 1-3.553-2.482l3.27-3.223h-6.551v6.456l2.138-2.107a11.344 11.344 0 0 0 4.08 2.823Z"
    />
  </Svg>
);
