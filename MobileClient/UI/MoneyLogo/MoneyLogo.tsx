import { PLN } from './icons/PLN';
import { MoneyLogoProps } from './MoneyLogo.props';
import React from 'react';
import { CHF } from './icons/CHF';
import { USD } from './icons/USD';
import { CAD } from './icons/CAD';
import { GBR } from './icons/GBR';
import { EUR } from './icons/EUR';

export default function MoneyLogo({ shortName, width = 57, height = 57 }: MoneyLogoProps) {
  return (
    <>
      {shortName === 'PLN' && <PLN width={width} height={height} />}
      {shortName === 'EUR' && <EUR width={width} height={height} />}
      {shortName === 'CHF' && <CHF width={width} height={height} />}
      {shortName === 'USD' && <USD width={width} height={height} />}
      {shortName === 'CAD' && <CAD width={width} height={height} />}
      {shortName === 'GBR' && <GBR width={width} height={height} />}
    </>
  );
}
