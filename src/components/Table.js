import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {

  removeItem = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    console.log(newExpenses);
    dispatch(removeExpense(newExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((ex) => {
            const res = (
              <tr key={ ex.id }>
                {/* <td>{ ex.id }</td> */}
                <td>{ ex.description }</td>
                <td>{ ex.tag }</td>
                <td>{ ex.method}</td>
                <td>{ `${ex.currency} ${Number(ex.value).toFixed(2)}` }</td>
                <td>{ ex.exchangeRates[ex.currency].name }</td>
                <td>
                  { `${ex.currency} 
                ${Number(ex.exchangeRates[ex.currency].ask).toFixed(2)}` }

                </td>
                <td>
                  { `R$ 
                ${(ex.exchangeRates[ex.currency].ask * ex.value).toFixed(2)}` }

                </td>
                <td>Real</td>
                <td>
                  {' '}
                  <button
                    className="btn-delete"
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.removeItem(ex.id) }
                  >
                    Excluir

                  </button>
                </td>
              </tr>);
            return res;
          })}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};
