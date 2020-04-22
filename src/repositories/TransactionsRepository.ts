import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const reducerIncome = (
      accumulator: number,
      currentTransation: Transaction,
    ): number => {
      if (currentTransation.type === 'income')
        return accumulator + currentTransation.value;
      return accumulator;
    };

    const reducerOutcome = (
      accumulator: number,
      currentTransation: Transaction,
    ): number => {
      if (currentTransation.type === 'outcome')
        return accumulator + currentTransation.value;
      return accumulator;
    };

    const income = this.transactions.reduce(reducerIncome, 0);

    const outcome = this.transactions.reduce(reducerOutcome, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
