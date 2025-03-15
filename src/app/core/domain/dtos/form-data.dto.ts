import { Step1DTO } from "./step1.dto";
import { Step2DTO } from "./step2.dto";
import { Step3DTO } from "./step3.dto";

export interface FormDataDTO {
        step_1: Step1DTO;
        step_2: Step2DTO;
        step_3: Step3DTO;
        currentStep: number;
}
