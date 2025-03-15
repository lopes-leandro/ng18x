import { FormDataDTO } from "../dtos/form-data.dto";
import { Step1DTO } from "../dtos/step1.dto";
import { Step2DTO } from "../dtos/step2.dto";
import { Step3DTO } from "../dtos/step3.dto";
import { FormDataModel } from "../models/form-data.model";
import { Step1Model } from "../models/step1.model";
import { Step2Model } from "../models/step2.model";
import { Step3Model } from "../models/step3.model";

export class StepMapper {


    static toModel(dto: FormDataDTO): FormDataModel {
        return {
            step1: this.toStep1Model(dto.step_1),
            step2: this.toStep2Model(dto.step_2),
            step3: this.toStep3Model(dto.step_3),
            currentStep: dto.currentStep
        }
    }

    static toDTO(model: FormDataModel): FormDataDTO {
        return {
            step_1: this.toStep1Dto(model.step1),
            step_2: this.toStep2Dto(model.step2),
            step_3: this.toStep3Dto(model.step3),
            currentStep: model.currentStep
        }
    }

    static toStep1Model(dto: Step1DTO): Step1Model {
        return {
            field1: dto.field_1,
            field2: dto.field_2,
            subArray1: dto.sub_array_1.map(item => ({
                field1: item.field_1,
                field2: item.field_2,
                field3: item.field_3,
                field4: item.field_4,
                field5: item.field_5,
            })),
            subArray2: dto.sub_array_2.map(item => ({
                field1: item.field_1,
                field2: item.field_2,
                field3: item.field_3,
                field4: item.field_4,
                field5: item.field_5,
            })),
        }
    }

    static toStep1Dto(model: Step1Model): Step1DTO{
        return {
            field_1: model.field1,
            field_2: model.field2,
            sub_array_1: model.subArray1.map(item => ({
                field_1: item.field1,
                field_2: item.field2,
                field_3: item.field3,
                field_4: item.field4,
                field_5: item.field5,
            })),
            sub_array_2: model.subArray2.map(item => ({
                field_1: item.field1,
                field_2: item.field2,
                field_3: item.field3,
                field_4: item.field4,
                field_5: item.field5,
            })),
        }
    }

    static toStep2Model(dto: Step2DTO): Step2Model {
        return {
            field1: dto.field_1,
            field2: dto.field_2,
            field3: dto.field_3,
        }
    }

    static toStep2Dto(model: Step2Model): Step2DTO{
        return {
            field_1: model.field1,
            field_2: model.field2,
            field_3: model.field3,
        }
    }

    static toStep3Model(dto: Step3DTO): Step3Model {
        return {
            field1: dto.field_1,
            field2: dto.field_2,
            field3: dto.field_3,
        }
    }

    static toStep3Dto(model: Step3Model): Step3DTO {
        return {
            field_1: model.field1,
            field_2: model.field2,
            field_3: model.field3
        }
    }
}
