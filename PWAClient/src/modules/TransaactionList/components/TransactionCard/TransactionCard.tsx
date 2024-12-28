import { TransactionCardProps } from './TransactionCard.props.ts';
import { dateToFormat } from '../../../../helpers/dateHelpers.ts';
import { roundMoney } from '../../../../helpers/moneyHelpers.ts';
import { ExchangeIcon } from './icons/ExchangeIcon.tsx';
import styles from './TransactionCard.module.pcss';

export default function TransactionCard({ ...props }: TransactionCardProps) {
  const date = dateToFormat(new Date(props.transactionDate));
  const inputMoney = `-${roundMoney(props.inputAmount)} ${props.inputCurrencySymbol}`;
  const outputMoney = `+${roundMoney(props.outputAmount)} ${props.outputCurrencySymbol}`;

  return (
    <div className={styles.card}>
      <div>
        <ExchangeIcon />
      </div>
      <div className={styles.container}>
        <div>
          <p className={styles.name}>
            {props.inputCurrencyShortName} to {props.outputCurrencyShortName}
          </p>
          <span className={styles.date}>{date}</span>
        </div>

        <div className={styles.moneyWrapper}>
          <p className={styles.moneyIn}>{inputMoney}</p>
          <p className={styles.moneyOut}>{outputMoney}</p>
        </div>
      </div>
    </div>
  );
}
