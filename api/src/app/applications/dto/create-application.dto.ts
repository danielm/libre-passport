import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsBoolean()
    @ApiProperty({ required: false, default: true })
    @IsOptional()
    readonly enabled?: boolean;

    @IsString()
    @ApiProperty({ required: false })
    @IsOptional()
    readonly url?: string;

    @IsBoolean()
    @ApiProperty({ required: false, default: false })
    @IsOptional()
    readonly enableRegistration?: boolean;

    @IsBoolean()
    @ApiProperty({ required: false, default: false })
    @IsOptional()
    readonly enableVerification?: boolean;
}
