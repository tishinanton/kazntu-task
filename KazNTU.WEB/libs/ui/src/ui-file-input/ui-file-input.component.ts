import { Component, OnInit, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ui-file-input',
    templateUrl: './ui-file-input.component.html',
    styleUrls: ['./ui-file-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UiFileInputComponent),
            multi: true
        }
    ]
})
export class UiFileInputComponent implements OnInit, ControlValueAccessor {

    @ViewChild('file') private fileInputElementRef: ElementRef;
    get fileInput() {
        return this.fileInputElementRef.nativeElement as HTMLInputElement;
    }
    img: string;
    label: string;

    disabled = false;

    private onChange = e => { };
    private onTouched = e => { };

    writeValue(obj: any): void {
        this.img = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    constructor() { }

    ngOnInit() {
    }

    async fileChanged() {
        const item = this.fileInput.files.item(0);
        this.label = item.name
        if (item) {
            try {
                const res = await this.readFile(item);
                this.img = res;
            } catch (ex) {
                this.img = null;
            }
        } else {
            this.img = null;
        }
        this.onChange(this.img);
    }

    chooseFile() {
        this.fileInput.click();
    }

    readFile(file: File) {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (data) => {
                resolve(fileReader.result);
            }
            fileReader.onerror = () => {
                reject();
            }
        });
    }

}
