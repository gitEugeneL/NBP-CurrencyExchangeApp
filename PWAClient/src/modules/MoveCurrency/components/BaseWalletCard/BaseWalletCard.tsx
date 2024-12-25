import { BaseWalletCardProps } from './BaseWalletCard.props.ts';
import MoneyLogo from '../../../../UI/MoneyLogo/MoneyLogo.tsx';
import { roundMoney } from '../../../../helpers/moneyHelpers.ts';
import styles from './BaseWalletCard.module.pcss';

export default function BaseWalletCard({ ...props }: BaseWalletCardProps) {
  return (
    <div className={styles.card}>
      <MoneyLogo shortName={props.shortName} width={48} height={48} />
      <div className={styles.wrapper}>
        <div className={styles.nameWrapper}>
          <p className={styles.shortName}>{props.shortName}</p>
          <p className={styles.name}>{props.name}</p>
        </div>
        <p className={styles.value}>
          {props.symbol} {roundMoney(props.value)}
        </p>
      </div>
    </div>
  );
}
