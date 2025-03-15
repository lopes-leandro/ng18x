import { Step1Model } from "./step1.model";
import { Step2Model } from "./step2.model";
import { Step3Model } from "./step3.model";

export interface FormDataModel {
    step1: Step1Model;
    step2: Step2Model;
    step3: Step3Model;
    currentStep: number;
}
