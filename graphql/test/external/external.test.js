const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
require("dotenv").config();

describe("API Grahpql - External", function () {
  it("1 - Deve retornar erro ao informar credenciais inválidas", async () => {
    const respostaEsperada = require("../fixture/quandoInformarUsuarioInvalido.test.json");
    const mutation = `
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
        email
      }
    }
  }
`;
    const resposta = await request(process.env.BASE_URL_GRAPHQL)
      .post(" ")
      .send({
        query: mutation,
        variables: {
          email: "alice@gmail.com",
          password: "8000000",
        },
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property("errors");
    expect(resposta.body.errors[0].message).to.equal(respostaEsperada.error);
  });


    it('2 - Deve cadastrar novo usuário retornar sucesso', async () => {
    const respostaEsperada = require('../fixture/quandoInformarusuarioValido.test.json');

    const mutation = `mutation 
    login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
        email
      }
    }
  }
    `;

    const res = await request(process.env.BASE_URL_GRAPHQL)
        .post(' ')
        .send({ query: mutation

    });
  });
});
