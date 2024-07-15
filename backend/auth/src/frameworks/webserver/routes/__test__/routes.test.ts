import request from 'supertest'
import app from '../../server'
import { UserModel } from '../../../database/mongodb/model/user'

const blockUser = async (): Promise<undefined> => {
  // Set isMailVerified to true to access the login
  const user = await UserModel.findOne({ username: 'aswin' })
  expect(user).toBeTruthy()

  if (user !== null) {
    user.isBlocked = true
    await user?.save()
  }
}

const verifyEmail = async (): Promise<undefined> => {
  // Set isMailVerified to true to access the login
  const user = await UserModel.findOne({ username: 'aswin' })
  expect(user).toBeTruthy()

  if (user !== null) {
    user.isEmailVerified = true
    await user?.save()
  }
}

const createUser = async (): Promise<undefined> => {
  // Create a new user
  await request(app).post('/api/v1/auth/user/signup/email').send({
    username: 'aswin',
    email: 'aswinedassery@gmail.com',
    password: 'Aswines@123'
  })
}

describe('User Creation Routes', () => {
  it('return 201 Created on successful request', async () => {
    const response = await request(app)
      .post('/api/v1/auth/user/signup/email')
      .send({
        username: 'aswin',
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.status).toBe('Success')
  })

  it('return 400 Bad Request on no Username', async () => {
    const response = await request(app)
      .post('/api/v1/auth/user/signup/email')
      .send({
        username: '',
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
      })
    expect(response.statusCode).toBe(400)
  })

  it('return 400 Bad Request on bad email', async () => {
    return await request(app)
      .post('/api/v1/auth/user/signup/email')
      .send({
        username: 'aswin',
        email: 'aswinesery@co876m',
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
    await request(app).post('/api/v1/auth/user/signup/email').send({
      username: 'aswines',
      email: 'aswinedassery@gmail.com',
      password: 'Aswines@123'
    })

    const response = await request(app)
      .post('/api/v1/auth/user/signup/email')
      .send({
        username: 'aswines',
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error[0].message === 'Email Already Exis')
  })
})

describe('User login test', () => {
  it('return 200 with refresh and access tokens', async () => {
    await createUser()
    await verifyEmail()
    // test the actual login route
    const response = await request(app)
      .post('/api/v1/auth/user/signin/email')
      .send({
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.refreshToken).toBeTruthy()
    expect(response.body.accessToken).toBeTruthy()
  })

  it('return 400 with error: Invalid Value For Password', async () => {
    await createUser()
    await verifyEmail()

    // test the actual login route
    const response = await request(app)
      .post('/api/v1/auth/user/signin/email')
      .send({
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@1234'
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error[0].message).toBe('Invalid Value')
  })

  it('return 400 with error: No User Found for Email', async () => {
    await createUser()
    await verifyEmail()

    // test the actual login route
    const response = await request(app)
      .post('/api/v1/auth/user/signin/email')
      .send({
        email: 'aswinedassery@gmaic.om',
        password: 'Aswines@1234'
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error[0].message).toBe('No User Found')
  })

  it('return 401 with error: Email not Verified', async () => {
    await createUser()

    // test the actual login route
    const response = await request(app)
      .post('/api/v1/auth/user/signin/email')
      .send({
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
      })

    expect(response.statusCode).toBe(401)
    expect(response.body.error[0].message).toBe('Email not Verified')
  })

  it('return 401 with error: User Blocked', async () => {
    await createUser()
    await verifyEmail()
    await blockUser()

    // test the actual login route
    const response = await request(app)
      .post('/api/v1/auth/user/signin/email')
      .send({
        email: 'aswinedassery@gmail.com',
        password: 'Aswines@123'
      })

    expect(response.statusCode).toBe(401)
    expect(response.body.error[0].message).toBe('User is blocked')
  })
})
