import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import '../styles/Login.css';
import img from '../images/carteira.png';

class Login extends Component {
  state = { email: '', senha: '', isHabilit: true };

  validFields = () => {
    const minValue = 6;
    const { email, senha } = this.state;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const senhaValida = senha.length >= minValue;
    this.setState({ isHabilit: !(emailValido && senhaValida) });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validFields);
  };

  redirect = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, senha, isHabilit } = this.state;
    return (
      <div className="container">
        <div className="container-img">
          <img src={ img } alt="carteira" />
        </div>
        <div className="container-login">
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Digite seu email"
            data-testid="email-input"
          />
          <input
            type="password"
            minLength="6"
            name="senha"
            value={ senha }
            onChange={ this.handleChange }
            placeholder="Digite sua senha"
            data-testid="password-input"
          />
          <button
            type="button"
            disabled={ isHabilit }
            onClick={ this.redirect }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}
export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
