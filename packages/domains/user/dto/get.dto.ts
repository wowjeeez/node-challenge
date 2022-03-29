import { IsString, IsUUID } from 'class-validator';

export class FetchUser {
    @IsString()
    @IsUUID()
    userId: string
}
