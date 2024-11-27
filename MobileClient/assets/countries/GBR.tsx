import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const GBR = () => (
  <Svg width={57} height={57} fill="none">
    <G clipPath="url(#a)">
      <Path fill="#012169" d="M0 0h57v57H0V0Z" />
      <Path
        fill="#fff"
        d="M57 0v7.125L35.848 28.5 57 49.318V57h-7.459L28.277 36.07 7.57 57H0v-7.57L20.707 28.61 0 8.238V0h6.902l21.375 20.93L48.984 0H57Z"
      />
      <Path
        fill="#C8102E"
        d="m20.484 36.07 1.225 3.785L4.676 57H0v-.334L20.484 36.07Zm13.805-1.336 6.012.891L57 51.99V57L34.29 34.734ZM57 0 35.625 21.82l-.445-4.898L51.879 0H57ZM0 .111l21.486 21.041-6.568-.89L0 5.455V.111Z"
      />
      <Path fill="#fff" d="M19.594 0v57h17.812V0H19.594ZM0 19.594v17.812h57V19.594H0Z" />
      <Path fill="#C8102E" d="M0 23.156v10.688h57V23.156H0ZM23.156 0v57h10.688V0H23.156Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={57} height={57} fill="#fff" rx={15} />
      </ClipPath>
    </Defs>
  </Svg>
);
