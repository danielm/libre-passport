import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApplicationRepository } from './applications/application.repository';

@Injectable()
export class ApplicationGuard implements CanActivate {
  constructor(
    private applicationRepository: ApplicationRepository,
    // private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const appId = this.extractTokenFromHeader(request);
    if (!appId) {
      throw new UnauthorizedException();
    }

    Logger.debug(`AuthGuard - Application: #${appId}`);

    try {
      const application = await this.applicationRepository.findOne(appId);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['application'] = application;
    } catch {
      Logger.error(`AuthGuard - Application not found: #${appId}`);

      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, appId] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? appId : undefined;
  }
}
