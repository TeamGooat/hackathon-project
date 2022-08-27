import { MailProvider } from '../../utils/mailProvider';
import { AuthStore } from './auth.store';
import {LoginDetails, RegisterDetails} from './auth.types';
import { createHash } from 'crypto';

export class AuthService {
  private store: AuthStore;
  private mailer: MailProvider;
  
  constructor() {
    this.store = new AuthStore();
    this.mailer = new MailProvider();
  }

  async signIn({ username, password }: LoginDetails) {
    const user = await this.store.getUsersByUsername(username);
    if (user) {
      if (user.verified) {
        const hash = createHash('sha256').update(`${username}:${password}`).digest('hex');
        if (hash === user.password) {
          return {
            success: true,
            user_id: user.exposed_id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
          };
        }
      } else {
        return {
          success: false,
          error: 'Unverified account',
        };
      }
    }

    return {
      success: false,
      error: 'Invalid username or password',
    };
  }

  async signUp(registerDetails: RegisterDetails) {
    const users = await Promise.all([await this.store.getUsersByEmail(registerDetails.email), await this.store.getUsersByUsername(registerDetails.username)].filter(user => user !== null));

    if (users.length > 0) {
      return {
        error: 'User already exists',
        success: false,
      }
    } else {
      const {otp, success} = await this.store.newUser(registerDetails)
      if (success) {
        await this.mailer.sendMail(registerDetails.email, 'Welcome to ResponsIO', `<h1>Welcome to ResponsIO</h1><br/>Use the code <strong>${otp}</strong> to verify your account`);
        return {
          success: true
        }
      } else {
        return {
          success: false
        }
      }
    }
  }

  async verifyOTP(otp: string) {
    return await this.store.verifyOTP(otp);
  }
}