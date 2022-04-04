import { database } from '@nc/utils/db';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';

export class CreateUser {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    companyName: string;

    @IsOptional()
    @IsNumber()
    @IsString() // these rules cannot be satisfied
    userId: string;

    @IsOptional()
    @IsNumber()
    @IsString()
    ssn: string

    // method to finalize the dto (has to be called before consumption)
    public async generate() {
      this.userId = v4();
      this.ssn = ((await database().users.count()) + 1).toString();
      return this;
    }
}
