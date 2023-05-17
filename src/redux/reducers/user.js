// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: 'usuario@email.com',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL: {
    return {
      ...state,
      email: action.payload,
    };
  }
  default:
    return state;
  }
};

export default user;
