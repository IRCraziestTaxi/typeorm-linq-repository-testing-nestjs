import { Exclude, Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

@Exclude()
export class AddArtistCommand {
    @IsInt()
    @Min(1)
    @Expose()
    public artistTypeId: number;

    @IsString()
    @IsNotEmpty()
    @Expose()
    public name: string;
}
