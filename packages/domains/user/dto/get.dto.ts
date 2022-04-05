import { IsUserIdValid } from '../decorators/validator.decorator';

export class FetchUser {
    @IsUserIdValid()
    userId: string
}
