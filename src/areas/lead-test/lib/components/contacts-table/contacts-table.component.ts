import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Contact } from '../../Models/contact';
import { ContactsService } from './contacts.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ApiPostResponse } from '../api-post-response';
import { EditContactDialog } from '../edit-contact-dialog/edit-contact-dialog';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html',
    styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit, OnDestroy {
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
    contacts: Contact[] = [];
    displayedColumns: string[] = ['name', 'MLPS', 'TankTotalCapacity', 'TankRemainedCapacity'];
    dataSource = new MatTableDataSource<Contact>(this.contacts);

    ngOnInit() {
        this.dataSource.paginator = this.paginator
        this.contactsService.fetchContacts()
        this.contactsServiceSubscription = this.contactsService.contactsChanged.subscribe(
            (contacts) => {
                this.dataSource.data = contacts
                this.ready = true
                this.loading = false
            }
        )
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
                            this.contactsService.fetchContacts()
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

