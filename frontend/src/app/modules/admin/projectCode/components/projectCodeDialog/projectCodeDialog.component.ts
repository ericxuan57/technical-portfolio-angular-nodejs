import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectCodeService } from '../../../../../core/services/projectCode.service';

export interface DialogData {
    activities: object;
    dependency: object;
    headquarter: object;
    orderNumber: String;
    years: object;
    today: Date;
}

@Component({
    selector: 'projectCodeDialog',
    styleUrls: ['./projectCodeDialog.component.scss'],
    templateUrl: './projectCodeDialog.component.html',
})
export class ProjectCodeDialogComponent implements OnInit {

    public _form: FormGroup;
    public selected = new Date().getFullYear();

    constructor(
        private _projectCodeService: ProjectCodeService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<ProjectCodeDialogComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    ngOnInit(): void {
        this._form = this.fb.group({
            visibleOrderNumber: [{ value: this.data.orderNumber, disabled: true }],
            orderNumber: [this.data.orderNumber],
            activities: ['', Validators.required],
            dependency: ['', Validators.required],
            headquarter: ['', Validators.required],
            year: [''],
            creationDate: [this.data.today],
        })
        this._form.get('year').setValue(this.selected);
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public addNewProjectCode(): void {
        if (this._form.invalid) {
            return;
        }
        
        this._projectCodeService.addNewProjectCode(this._form.value)
            .subscribe(
                (response) => {
                    if (response.status == 'success') {
                        this.dialogRef.close();
                    }
                }
            );
    }
}