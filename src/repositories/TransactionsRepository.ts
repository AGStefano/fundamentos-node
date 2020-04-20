import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((total, transaction) => total + transaction.value, 0);

    const outcomeTransactions = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, transaction) => total + transaction.value, 0);

    const balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: incomeTransactions - outcomeTransactions,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transactions = new Transaction({ title, type, value });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
