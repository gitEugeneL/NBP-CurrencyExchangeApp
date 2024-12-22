export const CHF = ({
  width = 57,
  height = 57
}: {
  width?: number;
  height?: number;
}) => (
  <svg width={width} height={height} viewBox='0 0 57 57' fill='none'>
    <g fillRule='evenodd' clipPath='url(#a)' clipRule='evenodd'>
      <path fill='#D52B1E' d='M0 0h57v57H0V0Z' />
      <path fill='#fff' d='M10.688 23.156h35.624v10.688H10.688V23.156Z' />
      <path fill='#fff' d='M23.156 10.688h10.688v35.624H23.156V10.688Z' />
    </g>
    <defs>
      <clipPath id='a'>
        <rect width={57} height={57} fill='#fff' rx={15} />
      </clipPath>
    </defs>
  </svg>
);
