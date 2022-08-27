import { PrismaClient } from '@prisma/client';
import { RegisterDetails } from './auth.types';
import { createHash } from 'crypto';
import { nanoid } from 'nanoid';

export class AuthStore {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getUsersByUsername(username: string) {
    return await this.client.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getUsersByEmail(email: string) {
    return await this.client.user.findUnique({
      where: {
        email,
      },
    });
  }


  async verifyOTP(otp: string) {
    const _otp = await this.client.userOTP.findUnique({
      where: {
        otp,
      },
      select: {
        user: true,
        expires_at: true,
      }
    })


    if (_otp && _otp.expires_at > new Date()) {
      await this.client.userOTP.delete({
        where: {
          otp,
        }
      })
      await this.client.user.update({
        where: {
          id: _otp.user.id,
        }, 
        data: {
          verified: true,
        }
      })

      return {
        success: true
      }
    } else {
      return {
        success: false
      }
    }
  }

  async newUser(user: RegisterDetails) {
    const otp = Math.random().toString(36).substring(2, 8);
    const hash = createHash('sha256').update(`${user.username}:${user.password}`).digest('hex');
    const time =  new Date();
    const exp = new Date(time.setHours(time.getHours() + 1))
    
    await this.client.user.create({
      data: {
        exposed_id: nanoid(),
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        password: hash,
        otp: {
          create: {
            otp: otp,
            expires_at: exp,
          }
        }
      },
    });

    return {
      otp,
      success: true
    }
  }
}