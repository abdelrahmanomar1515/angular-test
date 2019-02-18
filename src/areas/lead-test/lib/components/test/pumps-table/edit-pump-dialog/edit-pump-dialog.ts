import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'edit-pump-dialog',
    templateUrl: 'edit-pump-dialog.html',
    styleUrls: ['edit-pump-dialog.scss']
})
export class EditPumpDialog {

    constructor(
        public dialogRef: MatDialogRef<EditPumpDialog>,
        @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}