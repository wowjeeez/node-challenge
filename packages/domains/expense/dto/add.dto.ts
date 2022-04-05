import { IsUserIdValid } from '@nc/domain-user/decorators/validator.decorator';
import { v4 } from 'uuid';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddExpense {
    @MaxLength(255) // make sure it fits in the db!
    merchantName: string;

    @MaxLength(10)
    currency: string;

    @IsUserIdValid()
    userId: string;

    @IsNumber()
    amountInCents: number;

    @IsString() // usual always deny validation
    @IsNumber()
    @IsOptional()
    status: string;

    @IsString()
    @IsNumber()
    @IsOptional()
    date: Date;

    @IsString()
    @IsNumber()
    @IsOptional()
    id: string

    public generate() {
      this.status = 'pending'; // assume its a pending transaction
      this.date = new Date();
      this.id = v4();
      return this;
    }
}
