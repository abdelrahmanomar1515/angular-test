import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PumpsService } from './pumps-table/pumps.service';
import { Observable } from 'rxjs';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private pumpsService: PumpsService) { }
    getUrl = 'http://pumpapi.crowdthem.com/api/PumpsAPI/Pumps'
    saveUrl = 'http://pumpapi.crowdthem.com/api/PumpsAPI/SavePump'

    fetchPumps() {
        this.http.get(this.getUrl).subscribe(
            (res: any) => {
                this.pumpsService.updatePumps(res.Data)
            }
        )
    }
    savePump(pump) {
        return this.http.post(this.saveUrl, pump)
    }
}