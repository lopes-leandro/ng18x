import { ApolicyDTO, ApolicyViewModel } from "@core/models";

export class ApolicyMapper {

    static fromDTO(dto: ApolicyDTO): ApolicyViewModel {
        return {
            id: dto.poliza,
            contractNumber: dto.apolice,
            name: dto.nombre,
            dateStart: dto.data_inicio,
            dateEnd: dto.data_fim
        }
    }
}
