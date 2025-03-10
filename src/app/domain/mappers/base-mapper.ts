export interface BaseMapper<TInput, TOutput> {

    fromDto(dto: TInput): TOutput;

    toDto(model: TOutput): TInput;
}
