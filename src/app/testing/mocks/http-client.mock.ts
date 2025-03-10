import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

export function configureTestingModule(providers: any[] = []) {
    TestBed.configureTestingModule({
        imports: [ 
            provideHttpClient(),
            provideHttpClientTesting()],
        providers
    });
}

export function getHttpTestingController(): HttpTestingController {
    return TestBed.inject(HttpTestingController);
}