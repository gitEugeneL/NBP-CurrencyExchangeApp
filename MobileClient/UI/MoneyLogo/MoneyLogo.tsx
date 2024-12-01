import { MoneyLogoProps } from './MoneyLogo.props';
import React from 'react';
import { PLN } from '../../assets/countries/PLN';
import { EUR } from '../../assets/countries/EUR';
import { CHF } from '../../assets/countries/CHF';
import { USD } from '../../assets/countries/USD';
import { CAD } from '../../assets/countries/CAD';
import { GBR } from '../../assets/countries/GBR';

export default function MoneyLogo({ shortName, width = 57, height = 57 }: MoneyLogoProps) {
  return (
    <>
      {shortName === 'PLN' && <PLN width={width} height={height} />}
      {shortName === 'EUR' && <EUR width={width} height={height} />}
      {shortName === 'CHF' && <CHF width={width} height={height} />}
      {shortName === 'USD' && <USD width={width} height={height} />}
      {shortName === 'CAD' && <CAD width={width} height={height} />}
      {shortName === 'GBP' && <GBR width={width} height={height} />}
    </>
  );
}
