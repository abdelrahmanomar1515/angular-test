import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'edit-contact-dialog',
    templateUrl: 'edit-contact-dialog.html',
    styleUrls: ['edit-contact-dialog.scss']
})
export class EditContactDialog {

    constructor(
        public dialogRef: MatDialogRef<EditContactDialog>,
        @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}