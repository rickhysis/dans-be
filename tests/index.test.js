const supertest  = require('supertest');
const app = require('../src/app');
const request = supertest(app);
let token = null;

describe('Endpoint health test', () => {
    it('Get endpoint', async () => {
    // Sends GET Request to / endpoint
        const res = await request.get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Server is live !');
    })

});

describe('Endpoint user test', () => {

    it('Invalid login', async () => {
        const res = await request.post('/auth/login')
            .send({
                username: 'user_demo',
                password: 'wrong_password'
            });
        
        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Invalid username or password.');
    });

    it('Success login', async () => {
        const res = await request.post('/auth/login')
            .send({
                username: 'user_demo',
                password: 'Passw0rd'
            });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

});

describe('Endpoint job positions test', () => {

    it('List job position', async () => {
        const res = await request.get('/api/recruitment/positions.json')
        .set("Authorization",`Bearer ${token}`);
        
        expect(res.status).toBe(200);
        expect(res.body.data.totalItems).toBe(15);
        expect(Array.isArray(res.body.data.data.rows)).toBe(true);
    });

    it('List job position with pagination', async () => {
        const res = await request.get('/api/recruitment/positions.json?page=1&size=5')
        .set("Authorization",`Bearer ${token}`);
        
        expect(res.status).toBe(200);
        expect(res.body.data.data.rows.length).toBe(5);
        expect(Array.isArray(res.body.data.data.rows)).toBe(true);
    });

    it('Detail job position', async () => {
        const res = await request.get('/api/recruitment/positions/cb850cd5-ea88-484f-8ac1-5359894279b1')
        .set("Authorization",`Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('description');
    });

});
