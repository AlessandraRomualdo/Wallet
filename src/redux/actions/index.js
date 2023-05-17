// Coloque aqui suas actions
// -------Actions Types-----------------------------------------------------
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

// -------Actions-----------------------------------------------------------
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const fetchCurrency = () => async (dispatch) => {
  const res = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await res.json();
  const data2 = Object.keys(data);
  data2.splice(1, 1);
  dispatch(getCurrencies(data2));
  // console.log(data2);
  return data;
};

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
