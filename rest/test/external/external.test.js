const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('API Rest - POST/api/users/login', () => {
  let respostaComErro;

  before(async () => {
    respostaComErro = require('../fixture/respostas/quandoInformarEmailNaoCadastrado.json');
  });

  it('1 - Quando informar e-mail não cadastrado ou credenciais inválidas 401-Não Autorizado', async () => {
    const respostaLogin = await request(process.env.BASE_URL_REST)
      .post('/api/users/login')
      .send({ email: 'viviane.franca@gmail.com', password: '13092025' });

    expect(respostaLogin.status).to.equal(401);
    expect(respostaLogin.body).to.deep.equal(respostaComErro);
  });

  it('2 - Quando informar dados válidos para login retorna sucesso 200-OK', async () => {
    const respostaSucesso = require('../fixture/respostas/quandoInformarEmailValido.json');

    const res = await request(process.env.BASE_URL_REST)
      .post('/api/users/login')
      .send({
        email: respostaSucesso.email,
        password: respostaSucesso.password,
      });

    expect(res.status).to.equal(200);
  });
});

describe('API Rest - POST/api/Checkout', () => {
  // Cria usuário antes do teste
  before(async () => {
    await request(process.env.BASE_URL_REST)
      .post('/api/users/register')
      .send({
        email: respostaSucesso.email,
        password: respostaSucesso.password,
      });
  });

  const respostaSucesso = require('../fixture//respostas/quandoInformarDadosValidosParaCheckout.test.json');

    before(async () => {
      await request(process.env.BASE_URL_REST)
        .post('/api/users/register')
        .send({
          email: respostaSucesso.email,
          password: respostaSucesso.password,
        });
    });

    it('3 - Quando informar dados válidos para checkout retorna sucesso 200-OK', async () => {
      const checkoutRequest = require('../fixture/requisicoes/checkoutRequestDadosValidos.test.json');

      const loginValido = await request(process.env.BASE_URL_REST)
        .post('/api/users/login')
        .send({
          email: respostaSucesso.email,
          password: respostaSucesso.password,

        });

      token = loginValido.body.token;

      const respostaCheckout = await request(process.env.BASE_URL_REST)
        .post('/api/checkout')
        .set('Authorization', `Bearer ${token}`)
        .send(checkoutRequest);

      // console.log(respostaCheckout.status);


      expect(respostaCheckout.status).to.equal(200);
    });
});
