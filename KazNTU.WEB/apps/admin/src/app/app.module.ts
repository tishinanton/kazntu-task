import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BackendModule } from '@kazntu/backend';
import { UiModule } from '@kazntu/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListPageComponent } from './pages/user/user-list-page/user-list-page.component';
import { UserFormPageComponent } from './pages/user/user-form-page/user-form-page.component';
import { UserListGuard } from './resolvers/user/user-list.guard';
import { UserFormGuard } from './resolvers/user/user-form.guard';
import { PositionUserFormGuard } from './resolvers/position/position-user-form.guard';
import { DepartmentUserFormGuard } from './resolvers/department/department-user-form.guard';
import { GrouppedUserListComponent } from './pages/users/groupped-user-list/groupped-user-list.component';
import { DepartmentsGrouppedListGuard } from './resolvers/department/departments-groupped-list.guard';

@NgModule({
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        UiModule,
        BrowserAnimationsModule,
        // 'http://localhost:56374'
        BackendModule.forRoot('https://kazntu-api.azurewebsites.net'),
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        component: UserListPageComponent,
                        resolve: {
                            users: UserListGuard,
                        }
                    },
                    {
                        path: 'form',
                        component: UserFormPageComponent,
                        resolve: {
                            positions: PositionUserFormGuard,
                            departments: DepartmentUserFormGuard
                        }
                    },
                    {
                        path: 'form/:id',
                        component: UserFormPageComponent,
                        resolve: {
                            user: UserFormGuard,
                            positions: PositionUserFormGuard,
                            departments: DepartmentUserFormGuard
                        }
                    }
                ]
            },
            {
                path: 'groupped',
                component: GrouppedUserListComponent,
                resolve: {
                    departments: DepartmentsGrouppedListGuard,
                    filterPositions: PositionUserFormGuard,
                    filterDepartments: DepartmentUserFormGuard
                }
            }
        ], { initialNavigation: 'enabled' }),

    ],
    declarations: [AppComponent, UserListPageComponent, UserFormPageComponent, GrouppedUserListComponent],
    bootstrap: [AppComponent],
    providers: [
        UserListGuard, UserFormGuard, DepartmentUserFormGuard, PositionUserFormGuard, DepartmentsGrouppedListGuard
    ]
})
export class AppModule { }
