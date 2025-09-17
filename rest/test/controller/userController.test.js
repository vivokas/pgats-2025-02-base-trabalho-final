
// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../app');
const checkoutService = require ('../../../src/services/checkoutService');
const userService = require ('../../../src/services/userService');

describe('API Rest - Usando Mocks no userController', () => {
	afterEach(() => {
		sinon.restore();
	});


		it('1 - Quando autenticar usuário com sucesso retornar 200-OK', async () => {
			sinon.stub(userService, 'authenticate').returns({ token: 'validtoken' });

			const resposta = await request(app)
				.post('/api/users/login')
				.send({
					email: 'alice@email.com',
					password: '123456'
				});

			expect(resposta.status).to.equal(200);
			expect(resposta.body).to.have.property('token', 'validtoken');
		});

		it('2 - Quando não enviar token válido retornar 401-Não Autorizado', async () => {
		const resposta = await request(app)
			.post('/api/checkout')
			.send({
				items: [{ productId: 1, quantity: 2 }],
				freight: 0,
				paymentMethod: 'boleto',
				cardData: null
			});

		expect(resposta.status).to.equal(401);
		expect(resposta.body).to.have.property('error', 'Token inválido');
		
		});

        it('3 - Quando realizar checkout com sucesso retornar 200-OK', async () => {
            sinon.stub(userService, 'verifyToken').returns({ id: 2, email: 'bob@email.com' });
            sinon.stub(checkoutService, 'checkout').returns({
                orderId: 123,
                total: 52,
                status: 'success'
            });

            const resposta = await request(app)
                .post('/api/checkout')
                .set('Authorization', 'Bearer validtoken')
                .send({
                    items: [{ productId: 2, quantity: 2 }],
                    freight: 0,
                    paymentMethod: 'credit_card',
                    cardData: [{ number: "1309202522335569",name: 'Bob Marley da Silva' ,expiry: '12/2027' , cvv:'487'}]
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('status', 'success');
        });
	});

