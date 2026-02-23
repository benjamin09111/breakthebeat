import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Breakthebeat API - Ready for high-energy entertainment!';
  }
}
