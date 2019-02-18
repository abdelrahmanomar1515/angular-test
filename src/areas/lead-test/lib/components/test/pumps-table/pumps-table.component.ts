import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Pump } from '../pump';
import { PumpsService } from './pumps.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'areas/lead-test/lib/components/test/data-storage.service';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EditPumpDialog } from './edit-pump-dialog/edit-pump-dialog';
import { ApiPostResponse } from '../api-post-response';

@Component({
    selector: 'app-pumps-table',
    templateUrl: './pumps-table.component.html',
    styleUrls: ['./pumps-table.component.scss']
})
export class PumpsTableComponent implements OnInit, OnDestroy {
    constructor(private pumpsService: PumpsService,
        private dataStorageService: DataStorageService,
        private translate: TranslateService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar) {

    }
    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    loading = true
    ready = false

    pumpsServiceSubscription: Subscription
    pumps: Pump[] = [];
    displayedColumns: string[] = ['name', 'MLPS', 'TankTotalCapacity', 'TankRemainedCapacity'];
    dataSource = new MatTableDataSource<Pump>(this.pumps);

    ngOnInit() {
        this.dataSource.paginator = this.paginator
        this.dataStorageService.fetchPumps()
        this.pumpsServiceSubscription = this.pumpsService.pumpsChanged.subscribe(
            (pumps) => {
                this.dataSource.data = pumps
                this.ready = true
                this.loading = false
            }
        )
    }


    useLanguage(language: string) {
        this.translate.use(language);
    }

    pumpData = {
        Id: '',
        Name: '',
        TankRemainedCapacity: 0,
        TankTotalCapacity: 0

    }
    openDialog(): void {
        const dialogRef = this.dialog.open(EditPumpDialog, {
            width: '550px',
            data: { pump: this.pumpData }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const pumpData = {
                    Id: <Number>result.Id,
                    Name: <String>result.Name,
                    TankRemainedCapacity: <Number>result.TankRemainedCapacity,
                    TankTotalCapacity: <Number>result.TankTotalCapacity
                }
                this.dataStorageService.savePump(pumpData).subscribe(
                    (res: ApiPostResponse) => {
                        if (res.status == 1) {
                            this.openSnackBar("Saved successfully", "Got it!")
                            this.dataStorageService.fetchPumps()
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
        this.pumpsServiceSubscription.unsubscribe()
    }
}

