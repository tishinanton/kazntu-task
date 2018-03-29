import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_URL } from './models/tokens';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationContext, UsersDbSet, DepartmentsDbSet, PositionsDbSet } from './services';
import { MetadataInterceptor } from './services/interceptor';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class BackendModule {
    static forRoot(apiUrl: string): ModuleWithProviders {
        return {
            ngModule: BackendModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MetadataInterceptor,
                    multi: true
                },
                {
                    provide: API_URL,
                    useValue: apiUrl
                },
                UsersDbSet,
                DepartmentsDbSet,
                PositionsDbSet,
                ApplicationContext
            ]
        };
    }
}
