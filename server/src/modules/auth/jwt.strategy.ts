import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwtPayload.interface';

// It handles the extraction and validation of JWT tokens from incoming requests.
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    // Call the parent constructor (PassportStrategy) with the configuration options.
    super({
      jwtFromRequest: (req) => {
        if (req && req.cookies && req.cookies['accessToken']) {
          // If the accessToken cookie is present, return its value.
          return req.cookies['accessToken'];
        }
        // Return null if no accessToken is found in cookies
        return null;
      },
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // The validate method is invoked after the token is verified. Returns the user details
  async validate(payload: JwtPayload) {
    return { userId: payload.id, email: payload.email };
  }
}
