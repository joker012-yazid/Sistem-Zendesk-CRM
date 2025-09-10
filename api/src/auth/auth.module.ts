import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtModule.register({ secret: 'devsecret', signOptions: { expiresIn: '15m' } })],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
