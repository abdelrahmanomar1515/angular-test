import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Contact } from '../../Models/contact';
import { ContactsService } from './contacts.service';
import { Subscription, merge } from 'rxjs';
import { MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ApiPostResponse } from '../api-post-response';
import { EditContactDialog } from '../edit-contact-dialog/edit-contact-dialog';
import { switchMap, startWith, map } from 'rxjs/operators';
import { CommonResponse } from '../../Models/shared';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html',
    styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnDestroy, AfterViewInit {
    constructor(private contactsService: ContactsService,
        private translate: TranslateService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar) {

    }
    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    loading = true
    ready = false

    contactsServiceSubscription: Subscription
    displayedColumns: string[] = ['FirstName', 'LastName', 'PhoneNumber', 'EmailAddress'];
    // dataSource = new MatTableDataSource<Contact>(this.contacts);
    dataSource : Contact[] = [];

    ngAfterViewInit() {
        this.contactsServiceSubscription = merge(this.paginator.page).pipe(
            startWith({}),
            switchMap(()=>{
                this.loading = true
                this.ready = false
                return this.contactsService.fetchContacts({
                    PageSize: this.paginator.pageSize,
                    Page:this.paginator.pageIndex})
            }),map((data: CommonResponse)=>{
                this.loading = false;
                this.ready = true;
                this.resultsLength = data.Total;
                return data.Data
            })
        )
        .subscribe(contacts => this.dataSource = contacts )
    }

    useLanguage(language: string) {
        this.translate.use(language);
    }

    contactData = {
        Id: '',
        Name: '',
        TankRemainedCapacity: 0,
        TankTotalCapacity: 0

    }
    openDialog(): void {
        const dialogRef = this.dialog.open(EditContactDialog, {
            width: '550px',
            data: { contact: this.contactData }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const contactData = {
                    Id: <Number>result.Id,
                    Name: <String>result.Name,
                    TankRemainedCapacity: <Number>result.TankRemainedCapacity,
                    TankTotalCapacity: <Number>result.TankTotalCapacity
                }
                this.contactsService.saveContact(contactData).subscribe(
                    (res: ApiPostResponse) => {
                        if (res.status == 1) {
                            this.openSnackBar("Saved successfully", "Got it!")
                            this.contactsService.fetchContacts({
                                PageSize:2,
                                Page:2})
                            console.log(res)
                        } else {
                            this.openSnackBar("Unable to save", "Dismiss")
                            console.log(res)
                        }
                    })
            }

        });
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    ngOnDestroy(): void {
        this.contactsServiceSubscription.unsubscribe()
    }
}

