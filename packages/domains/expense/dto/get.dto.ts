import {IsBoolean, IsIn, IsNumber, IsOptional, IsString, IsUUID, Length, Matches, Min} from 'class-validator';
const SORT_METHODS = ['amount', 'date', 'status', 'merchname'] as const;
const FILTER_METHODS = ['amount', 'date', 'status', 'merchname', 'none', 'currency'] as const;
/* eslint-disable */
export class Fetch {
   @IsIn(FILTER_METHODS)
   @IsOptional()
   filterBy: typeof FILTER_METHODS[number] = 'none';

   @IsString()
   @IsOptional()
   filter: string = '';

   @IsIn(SORT_METHODS)
   @IsOptional()
   sortBy: typeof SORT_METHODS[number] = "date";

   @IsBoolean()
   @IsOptional()
   ascending: boolean = false;

   @IsNumber()
   @Min(0)
   @IsOptional()
   pageId: number = 0;

   @IsNumber()
   @Min(1)
   @IsOptional()
   pageSize: number = 10;

   @IsString()
   @IsUUID()
   userId: string
}