import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Position, Department, OdataResponse, User, ApplicationContext } from '@kazntu/backend';
import { filter, map, takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'admin-user-form-page',
    templateUrl: './user-form-page.component.html',
    styleUrls: ['./user-form-page.component.scss']
})
export class UserFormPageComponent implements OnInit, OnDestroy {

    positions: Position[] = [];
    departments: Department[] = [];
    user: User;
    mode: 'create' | 'edit' = 'create';
    private imageChanged = false;
    private oldImage: string;


    _destroy = new Subject();

    public form = new FormGroup({
        Id: new FormControl(null),
        FirstName: new FormControl(null, Validators.required),
        LastName: new FormControl(null, Validators.required),
        MiddleName: new FormControl(null),
        Gender: new FormControl(null, Validators.required),
        Image: new FormControl(null, Validators.required),
        PositionId: new FormControl(null, Validators.required),
        DepartmentId: new FormControl(null, Validators.required),
    });

    constructor(
        private route: ActivatedRoute,
        private context: ApplicationContext,
        private router: Router
    ) { }

    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }

    ngOnInit() {
        this.route.data.pipe(
            filter(data => 'positions' in data),
            map(data => data.positions),
            takeUntil(this._destroy.asObservable())
        )
            .subscribe((response: OdataResponse<Position>) => {
                this.positions = response.value;
            });
        this.route.data.pipe(
            filter(data => 'departments' in data),
            map(data => data.departments),
            takeUntil(this._destroy.asObservable())
        )
            .subscribe((response: OdataResponse<Department>) => {
                this.departments = response.value;
            });
        this.route.data.pipe(takeUntil(this._destroy.asObservable()))
            .subscribe(data => {
                if ('user' in data) {
                    if (data.user == null) {
                        this.router.navigate(['/users']);
                        return;
                    }
                    this.switchToEditMode(data.user);
                } else {
                    this.switchToCreateMode();
                }
            });
        this.form.get('Image').valueChanges.pipe(take(1), takeUntil(this._destroy.asObservable())).subscribe(() => this.imageChanged = true);
    }


    private switchToEditMode(user: User) {
        this.mode = 'edit';
        this.user = user;
        this.oldImage = this.user.Image;
        if (this.user.Image) {
            this.user.Image = `${this.context.apiUrl}/Content/Images/${this.user.Image}`
        }
        this.form.setValue(user);
    }

    private switchToCreateMode() {
        this.mode = 'create';
        delete this.user;
        this.form.reset();
    }

    async submit() {
        console.log(this.form, this.form.valid);
        if (!this.form.valid) {
            return;
        }
        if (this.mode === 'create') {
            try {
                await this.context.users.post(this.form.value).toPromise();
                this.router.navigate(['/users']);
            } catch { }
        } else {
            try {
                if (!this.imageChanged) {
                }
                await this.context.users.put(this.user.Id, {
                    ...{ Id: this.user.Id },
                    ...this.form.value,
                    ...(this.imageChanged ? {} : { Image: this.oldImage })
                }).toPromise();
                this.router.navigate(['/users']);
            } catch { }
        }
    }

}
