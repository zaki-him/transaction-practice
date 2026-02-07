import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WalletService } from './wallet/wallet.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly walletService: WalletService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('transfer')
  async transferFunds() {
    return await this.walletService.transferFunds(
      'account-id-1',
      'account-id-2',
      100.00,
    );
  }
  
}
