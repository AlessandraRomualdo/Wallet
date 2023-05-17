import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';
import img from '../images/bolsa-de-dinheiro.png';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div className="header-container">
        <div className="container-title">
          <img src={ img } alt="Bolsa de din-din" />
          <h1>TrybeWallet</h1>
        </div>
        <div className="container-textValue">
          <p>Total de Despesas </p>
          <div className="container-value">
            <p data-testid="total-field">{`R$ ${total}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
        <div className="container-user">
          <p data-testid="email-field">{`Email: ${email}`}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
