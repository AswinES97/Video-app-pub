import request from 'supertest'
import app from '../../server'

it('return 201 Created on successful request', async () => {
  return await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: 'aswin',
      email: 'aswinedassery@gmail.com',
      password: 'Aswines@123'
    })
    .expect(201)
})

it('return 400 Bad Request on no user', async () => {
  return await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: '',
      email: 'aswinedassery@gmail.com',
      password: 'Aswines@123'
    })
    .expect(400)
})

it('return 400 Bad Request on bad email', async () => {
  return await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: 'aswin',
      email: 'aswinedassery@com',
      password: 'Aswines@123'
    })
    .expect(400)
})

it('return 400 Bad Request on bad password', async () => {
  return await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: 'aswin',
      email: 'aswinedassery@gmail.com',
      password: 'Aswines123'
    })
    .expect(400)
})

it('return 400 Bad Request on bad password,email, and no username', async () => {
  return await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: '',
      email: 'aswinedassery@com',
      password: 'Aswines123'
    })
    .expect(400)
})

it('return 400 Bad Request on user exist', async () => {
  await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: 'aswines',
      email: 'aswinedassery@gmail.com',
      password: 'Aswines@123'
    })

  await request(app)
    .post('/api/v1/auth/user/signup/email')
    .send({
      username: 'aswines',
      email: 'aswinedassery@gmail.com',
      password: 'Aswines@123'
    })
    // .expect(400)
})
