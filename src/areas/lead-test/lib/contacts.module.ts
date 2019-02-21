import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsTableComponent} from './components/contacts-table/contacts-table.component';
import { MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatGridListModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ContactsService } from './components/contacts-table/contacts.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { EditContactDialog } from './components/edit-contact-dialog/edit-contact-dialog';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatGridListModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    ContactsRoutingModule
  ],
  entryComponents: [
    EditContactDialog
  ],
  declarations: [
    ContactsComponent,
    ContactsTableComponent,
    EditContactDialog
  ],
  providers: [ContactsService]
})
export class ContactsModule { }
