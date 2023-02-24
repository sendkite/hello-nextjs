import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  getMe() {
    return this.prisma.user.findUnique({
      where: { id: 1 },
    });
  }
}
