export interface SubArray1ItemDTO {
    field_1: string;
    field_2: string;
    field_3: string;
    field_4: string;
    field_5: string;
}

export interface SubArray2ItemDTO {
    field_1: string;
    field_2: string;
    field_3: string;
    field_4: string;
    field_5: string;
}


export interface Step1DTO {
    field_1: string;
    field_2: string;
    sub_array_1: SubArray1ItemDTO[];
    sub_array_2: SubArray2ItemDTO[];
}