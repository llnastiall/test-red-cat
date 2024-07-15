import { IsInt, IsOptional, Min } from 'class-validator';
import {ApiPropertyOptional} from "@nestjs/swagger";

export class PaginationGetAllUsersDto {
    @ApiPropertyOptional({
        description: 'Page number',
        default: 1,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        default: 10,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number;
}
