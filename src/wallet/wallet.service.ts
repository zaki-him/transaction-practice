import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/accounts.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(@InjectRepository(Account) private accountRepo: Repository<Account>) {}

  async transferFunds(fromAccountId: string, toAccountId: string, amount: number) {
    return await this.accountRepo.manager.transaction(async (manager) => {
      const fromAccount = await manager.findOne(Account, { where: { id: fromAccountId } });
      const toAccount = await manager.findOne(Account, { where: { id: toAccountId } });

      if (!fromAccount || !toAccount) {
        throw new NotFoundException('One or both accounts not found');
      }
      
      if (fromAccount.balance < amount) {
        throw new BadRequestException('Insufficient funds in the source account');
      }

      fromAccount.balance -= amount
      toAccount.balance += amount

      await manager.save(fromAccount)
      await manager.save(toAccount)
    }
    )
  }

}
