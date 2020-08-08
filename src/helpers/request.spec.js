require('dotenv').config();
const requestHelper = require('../helpers/request');
const md5 = require('md5');

describe('request', () => {
    let config;

    beforeAll(async () => {
        // create default request config
        const endpoint = '/characters';
        const ts = Date.now();
        config = {
            params: {
                ts,
                apikey: process.env.MARVEL_PUBLIC_KEY,
                hash: md5(`${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`),
            },
            url: `${process.env.MARVEL_API_URL}${endpoint}`,
        };
    });

    it('should fail when given invalid config', async () => {
        try {
            const config = {};
            await requestHelper.request(config);
            fail('should fail when given invalid config');
        } catch (e) {
            console.log(e);
            expect(e).toBeDefined();
        }
    });

    it('should success when given valid config', async () => {
        const res = await requestHelper.request(config);
        expect(res).toBeDefined();
        expect(res.status).toEqual(200);

        expect(res.data).toBeDefined();
        const data = res.data;
        expect(data.code).toBeDefined();
        expect(data.status).toBeDefined();

        expect(data.code).toEqual(200);
        expect(data.status).toEqual('Ok');

        expect(data.data).toBeDefined();

        const dataRes = data.data;
        const expectedDataRes = ['offset', 'limit', 'total', 'count', 'results'];
        expectedDataRes.forEach((expectedKey) => {
            expect(dataRes[expectedKey]).toBeDefined();
        });
    });
});
