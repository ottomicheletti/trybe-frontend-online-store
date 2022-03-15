import React, { Component } from 'react';
import Header from '../components/Header';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      isChecked: '',
    };
  }

  componentDidMount() {
    const productList = JSON.parse(localStorage.getItem('productList'));
    this.setState({ productList });
    console.log(productList);
  }

  handleChange = ({ target: { name } }) => {
    this.setState({ isChecked: name });
  }

  render() {
    const { productList, isChecked } = this.state;
    const cartQuantity = productList.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <div>
        <Header cartQuantity={ cartQuantity } />
        <form>
          <fieldset>
            <h2>Revise seus Produtos</h2>
            {productList.map((product, index) => (
              <div key={ index }>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>
                  {`${product.title} 
Qtd: ${product.quantity} R$ ${product.quantity * product.price}`}
                </p>
              </div>
            ))}
            <span>
              <h4>
                Total: R$
              </h4>
              <p>
                {productList.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)}
              </p>
            </span>
          </fieldset>
          <fieldset>
            <input
              type="text"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
            />
            <input type="text" placeholder="CPF" data-testid="checkout-cpf" />
            <input type="text" placeholder="Email" data-testid="checkout-email" />
            <input type="text" placeholder="Telefone" data-testid="checkout-phone" />
            <input type="text" placeholder="CEP" data-testid="checkout-cep" />
            <input type="text" placeholder="Endereço" data-testid="checkout-address" />
            <input type="text" placeholder="Complemento" />
            <input type="text" placeholder="Numero" />
            <input type="text" placeholder="Cidade" />
            <select>
              <option value="Acre">Acre</option>
              <option value="Alagoas">Alagoas</option>
              <option value="Amapa">Amapa</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Bahia">Bahia</option>
              <option value="Ceara">Ceara</option>
              <option value="Distrito Federal">Distrito Federal</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Goias">Goias</option>
              <option value="Maranhao">Maranhao</option>
              <option value="Mato Grosso">Mato Grosso</option>
              <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Para">Para</option>
              <option value="Paraiba">Paraiba</option>
              <option value="Parana">Parana</option>
              <option value="Pernambuco">Pernambuco</option>
              <option value="Piaui">Piaui</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Rio Grande do Norte">Rio Grande do Norte</option>
              <option value="Rio Grande do Sul">Rio Grande do Sul</option>
              <option value="Rondonia">Rondonia</option>
              <option value="Roraima">Roraima</option>
              <option value="Santa Catarina">Santa Catarina</option>
              <option value="Sao Paulo">Sao Paulo</option>
              <option value="Sergipe">Sergipe</option>
              <option value="Tocantins">Tocantins</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                name="boleto"
                checked={ isChecked === 'boleto' }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Visa">
              Visa
              <input
                type="radio"
                name="Visa"
                checked={ isChecked === 'Visa' }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="MasterCard">
              MasterCard
              <input
                type="radio"
                name="MasterCard"
                checked={ isChecked === 'MasterCard' }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Elo">
              Elo
              <input
                type="radio"
                name="Elo"
                checked={ isChecked === 'Elo' }
                onChange={ this.handleChange }
              />
            </label>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Checkout;
