import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const CHF = () => (
  <Svg width={57} height={57} fill="none">
    <G fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
      <Path fill="#D52B1E" d="M0 0h57v57H0V0Z" />
      <Path fill="#fff" d="M10.688 23.156h35.624v10.688H10.688V23.156Z" />
      <Path fill="#fff" d="M23.156 10.688h10.688v35.624H23.156V10.688Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={57} height={57} fill="#fff" rx={15} />
      </ClipPath>
    </Defs>
  </Svg>
);
