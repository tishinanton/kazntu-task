import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { OdataResponse, User, ApplicationContext } from '@kazntu/backend';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'admin-user-list-page',
    templateUrl: './user-list-page.component.html',
    styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {

    datasource: UserListDataSource;
    columns = ['Name', 'Position', 'Department', 'Image', 'Actions'];

    @ViewChild('confirmation')
    public confirmationTemplate: TemplateRef<any>;
    public deletingUser: User;
    constructor(
        private route: ActivatedRoute,
        private context: ApplicationContext,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.route.data.pipe(
            filter(data => 'users' in data),
            map(data => data.users as OdataResponse<User>)
        ).subscribe(response => {
            this.datasource = new UserListDataSource();
            this.datasource.init(response.value);
        })
    }

    getImageUrl(user: User) {
        return `${this.context.apiUrl}/Content/Images/${user.Image}`;
    }

    async remove(user: User) {
        this.deletingUser = user;
        const res = await this.dialog.open(this.confirmationTemplate).afterClosed().toPromise();
        if (res === true) {
            await this.context.users.delete(user.Id).toPromise();
            this.datasource.remove(user);
        }
    }

}


export class UserListDataSource extends DataSource<User> {
    private subject = new BehaviorSubject<User[]>([]);
    remove(user: User) {
        const users = this.subject.value;
        users.splice(users.indexOf(user), 1);
        this.subject.next(users);
    }

    init(users: User[]) {
        this.subject.next(users);
    }
    connect(collectionViewer): Observable<User[]> {
        return this.subject.asObservable();
    }
    disconnect(collectionViewer): void {
    }
}