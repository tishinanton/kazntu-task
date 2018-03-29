import { Component, OnInit, OnDestroy } from '@angular/core';
import { Department, OdataResponse, Position, ApplicationContext } from '@kazntu/backend';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil, filter, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'admin-groupped-user-list',
    templateUrl: './groupped-user-list.component.html',
    styleUrls: ['./groupped-user-list.component.scss']
})
export class GrouppedUserListComponent implements OnInit, OnDestroy {


    departments: Department[] = [];
    filterDepartments: Department[] = [];
    filterPositions: Position[] = [];
    private _destroy = new Subject();

    lastNameControl = new FormControl();
    positionControl = new FormControl();
    departmentControl = new FormControl();
    openedPanel: string;

    constructor(
        private route: ActivatedRoute,
        private context: ApplicationContext
    ) {
        this.route.data.pipe(
            filter(data => 'departments' in data),
            map(data => data.departments as OdataResponse<Department>),
            takeUntil(this._destroy.asObservable())
        ).subscribe(response => {
            this.departments = response.value;
        });

        this.route.data.pipe(
            filter(data => 'filterPositions' in data),
            map(data => data.filterPositions as OdataResponse<Position>),
            takeUntil(this._destroy.asObservable())
        ).subscribe(response => {
            this.filterPositions = response.value;
        });

        this.route.data.pipe(
            filter(data => 'filterDepartments' in data),
            map(data => data.filterDepartments as OdataResponse<Department>),
            takeUntil(this._destroy.asObservable())
        ).subscribe(response => {
            this.filterDepartments = response.value;
        });
    }

    reset() {
        this.departmentControl.reset();
        this.lastNameControl.reset();
        this.positionControl.reset();
    }

    filter() {
        const userFilter = [];
        if (this.lastNameControl.value != null && this.lastNameControl.value !== "") {
            userFilter.push(`contains(LastName, '${this.lastNameControl.value}')`);
        }
        if (this.positionControl.value != null) {
            userFilter.push(`PositionId eq ${this.positionControl.value}`);
        }
        let params = new HttpParams();
        if (userFilter.length) {
            params = params.set('$expand', `Users($filter=${userFilter.join(' and ')};$expand=Position)`);
        } else {
            params = params.set('$expand', 'Users($expand=Position)');
        }
        if (this.departmentControl.value != null) {
            params = params.set('$filter', `Id eq ${this.departmentControl.value}`);
        }
        this.context.departments.get(params).subscribe(response => {
            this.departments = response.value;
        });
    }

    panelOpened(department: Department) {
        this.openedPanel = department.Id;
    }

    ngOnInit() {

    }
    ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }


}
