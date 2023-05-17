// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, SAVE_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE_WALLET = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0.00,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    return { ...state,
      currencies: action.payload,
    };
  }
  case SAVE_EXPENSE: {
    const newExpenses = [...state.expenses, action.payload];
    const updatedExpenses = newExpenses.map((expense) => {
      const { currency } = expense;
      const exchangeRates = expense.exchangeRates[currency];
      return { ...expense, exchangeRates };
    });
    const total = updatedExpenses
      .reduce((sum, expense) => {
        const exchangeRate = expense.exchangeRates;
        const valu = Number(exchangeRate.ask);
        return sum + valu * expense.value;
      }, 0);
    const formattedTotal = total.toFixed(2);
    return { ...state,
      expenses: newExpenses,
      total: formattedTotal,
    };
  }
  case REMOVE_EXPENSE: {
    const newExpenses = [...action.payload];
    const updatedExpenses = newExpenses.map((expense) => {
      const { currency } = expense;
      const exchangeRates = expense.exchangeRates[currency];
      return { ...expense, exchangeRates };
    });
    const total = updatedExpenses
      .reduce((sum, expense) => {
        const exchangeRate = expense.exchangeRates;
        const valu = Number(exchangeRate.ask);
        return sum + valu * expense.value;
      }, 0);
    const formart = total.toFixed(2);
    if (state.expenses === 0) {
      return { ...state, total: 0.00 };
    }
    return { ...state,
      expenses: newExpenses,
      total: formart,
    };
  }
  default: return state;
  }
};

export default wallet;
