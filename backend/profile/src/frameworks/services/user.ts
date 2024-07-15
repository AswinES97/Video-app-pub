import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class Password {
  async hash (password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex')
    const buf = (await scryptAsync(password, salt, 64)) as Buffer
    return `${buf.toString('hex')}.${salt}}`
  }

  async compare (storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.')
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer
    return buf.toString('hex') === hashedPassword
  }
}

export interface IUserSignup {
  hashPass: (arg1: string) => Promise<string>
  comparePass: (arg1: string, arg2: string) => Promise<boolean>
  generateToken: (arg1: string) => string
}
