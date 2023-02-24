import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginRequestDto, SignupRequestDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(request: SignupRequestDto) {
    const passwordHash = await argon.hash(request.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: request.email,
          hash: passwordHash,
        },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }

  async login(request: LoginRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email is not found');
    }
    const validatePassword = await argon.verify(user.hash, request.password);

    if (!validatePassword) {
      throw new ForbiddenException('Password is not correct');
    }

    delete user.hash;

    return user;
  }
}
