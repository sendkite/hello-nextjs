import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [CatsModule, UsersModule, AuthModule, BookmarksModule],
})
export class AppModule {}
