import { NacionalidadeDto } from "@domain/dtos";
import { Nacionalidade } from "@domain/models";

export class NacionalidadeMapper {

    static fromDto(dto: NacionalidadeDto): Nacionalidade {
        return {
            id: dto.id,
            descricao: dto.nationality_name.toLocaleUpperCase()
        }
    }
}
