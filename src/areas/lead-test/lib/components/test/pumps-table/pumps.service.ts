import { Injectable } from '@angular/core';
import { Pump } from '../pump';
import { Subject } from 'rxjs';

@Injectable()
export class PumpsService {
    private pumps:Pump[] = []
    pumpsChanged = new Subject<Pump[]>()

    updatePumps(pumps:Pump[]){
        this.pumps = pumps
        this.pumpsChanged.next(this.pumps.slice())
    }
}