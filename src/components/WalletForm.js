import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, saveExpense } from '../redux/actions';
import Table from './Table';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    idCounter: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  stateInitial = () => {
    this.setState({ value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação' });
  };

  fetchexchangeRates = async () => {
    const res = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await res.json();
    delete data.USDT;
    return data;
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validFields);
  };

  saveExpenses = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, idCounter } = this.state;

    const id = idCounter;
    const exchangeRates = await this.fetchexchangeRates();
    dispatch(saveExpense({ id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates }));
    this.setState((prevState) => ({
      idCounter: prevState.idCounter + 1,
    }));
    this.stateInitial();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <section>
        <form>

          <h3>Adicione uma Despesa</h3>

          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            id="value"
            placeholder="Valor"
            onChange={ this.handleChange }
          />

          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            id="description"
            placeholder="Breve Descrição"
            onChange={ this.handleChange }
          />

          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            { currencies && currencies.map((currenc, index) => (
              <option key={ index } value={ currenc }>{currenc}</option>
            ))}
          </select>

          <select
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>

          </select>

          <button
            type="button"
            onClick={ this.saveExpenses }
          >
            Adicionar despesa

          </button>
        </form>
        <Table />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
