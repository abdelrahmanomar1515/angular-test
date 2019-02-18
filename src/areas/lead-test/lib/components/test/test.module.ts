import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { PumpsTableComponent} from './pumps-table/pumps-table.component';
import { MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatGridListModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DataStorageService } from './data-storage.service';
import { PumpsService } from './pumps-table/pumps.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { EditPumpDialog } from './pumps-table/edit-pump-dialog/edit-pump-dialog';
import { TestRoutingModule } from './test-routing.module';

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
    TestRoutingModule
  ],
  entryComponents: [
    EditPumpDialog
  ],
  declarations: [
    TestComponent,
    PumpsTableComponent,
    EditPumpDialog
  ],
  providers: [DataStorageService, PumpsService]
})
export class TestModule { }
