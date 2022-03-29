import { IsIn, IsNumberString, IsOptional, IsString, IsUUID, Min } from 'class-validator';
const SORT_METHODS = ['amount', 'date', 'status', 'merchname'] as const;
const FILTER_METHODS = ['amount', 'date', 'status', 'merchname', 'none', 'currency'] as const;
/* eslint-disable */
export class FetchExpenses {
   @IsIn(FILTER_METHODS)
   @IsOptional()
   filterBy: typeof FILTER_METHODS[number] = 'none';

   @IsString()
   filter: string = '';

   @IsIn(SORT_METHODS)
   orderBy: typeof SORT_METHODS[number] = "date";

   @IsIn(['0', '1'])
   @IsOptional()
   ascending: string = '0';

   @IsNumberString()
   @IsOptional()
   pageId: string = '0';

   @IsNumberString()
   @IsOptional()
   pageSize: string = '10';

   @IsString()
   @IsUUID()
   userId: string
}