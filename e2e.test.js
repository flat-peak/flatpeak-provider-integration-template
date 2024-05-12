require('dotenv').config();
const request = require('supertest');
const app = require('./app.js');
const {TariffSchema} = require('@flat-peak/express-integration-sdk');
const {capture, convert, authorise} = require('./modules/provider');


const validCredentials = {
  login: process.env.TEST_CUSTOMER_USER,
  password: process.env.TEST_CUSTOMER_PASSWORD,
};

// const invalidCredentials = {
//   login: 'invalid-user@gmail.com',
//   password: 'invalid-pass',
// };

describe('<PROVIDER_TITLE> -> E2E', () => {
  describe('API', () => {
    describe('/tariff_plan', () => {
      it('should fetch tariff plan with valid credentials', async () => {
        const result = await request(app).post('/api/tariff_plan')
            .send({auth_metadata: {data: validCredentials}});
        console.log(result.body);
        TariffSchema.parse(result.body);
      }, 200000);
    });
  });
  describe('UNIT', () => {
    it('should authorise', async () => {
      try {
        await authorise(validCredentials);
      } catch (e) {
        console.log(e);
        throw e;
      }
    });

    it.skip('should capture tariff', async () => {
      try {
        await capture({  secureParams: {} });
      } catch (e) {
        console.log(e);
        throw e;
      }
    });

    it('should convert tariff', async () => {
      try {
        const result = await convert({  'tariff': {} });
        TariffSchema.parse(result);
      } catch (e) {
        console.log(e);
        throw e;
      }
    });
  });
});
