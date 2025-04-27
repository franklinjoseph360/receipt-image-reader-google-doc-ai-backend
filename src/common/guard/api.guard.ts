import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_CONFIG } from 'src/common/constants/api.constants';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKeyFromHeader = request.headers[API_CONFIG.API_HEADER_KEY];

    const validApiKey = this.configService.get<string>(API_CONFIG.API_ENV_KEY);

    if (!apiKeyFromHeader || apiKeyFromHeader !== validApiKey) {
      throw new UnauthorizedException(`Invalid or missing ${API_CONFIG.API_HEADER_KEY} header`);
    }

    return true;
  }
}
