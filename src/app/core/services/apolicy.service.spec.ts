import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ApolicyService } from './apolicy.service';



type ApolicyDtoFake = {
  poliza: number;
  nombre: string;
  apolice: string;
  data_inicio: string;
  data_fim: string;
}

type ApolicyViewModelFake = {
  id: number;
  name: string;
  contractNumber: string;
  dateStart: string;
  dateEnd: string;
};

describe('ApolicyService', () => {
  let service: ApolicyService;

  const mockApiResponse: ApolicyDtoFake[] = [
    {
      poliza: 123,
      nombre: "Seguro Vida",
      apolice: "A12345",
      data_inicio: "2024-01-01",
      data_fim: "2025-01-01",
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        ApolicyService,
      ],
    });
    service = TestBed.inject(ApolicyService);
  });

  it("deve buscar todas as apólices e mapear para ViewModel", fakeAsync(() => {
    // Given
    let result!: ApolicyViewModelFake[];

    // When
    service.getAllPolicies().subscribe(data => (result = data));

    tick(); // Aguarda a resposta assíncrona

    // Then
    expect(result).toEqual([
      {
        id: 123,
        name: "Seguro Vida",
        contractNumber: "A12345",
        dateStart: "2024-01-01",
        dateEnd: "2025-01-01",
      },
    ]);
  }));

});
