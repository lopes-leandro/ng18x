
import { OccupationDto } from "@domain/dtos";
import { Occupation } from "@domain/models";

export class OccupationMapper {

    static fromDto(dto: OccupationDto): Occupation {
        return {
            id: dto.id,
            description: dto.title
        }
    }

}
