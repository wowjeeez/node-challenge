import { database } from '@nc/utils/db';
import { v4 } from 'uuid';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUser {
    @MaxLength(255)
    firstName: string;

    @MaxLength(255)
    lastName: string;

    @MaxLength(255)
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
