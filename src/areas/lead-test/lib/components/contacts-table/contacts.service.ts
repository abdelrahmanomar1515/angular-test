import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../../Models/contact';
import { HttpClient } from '@angular/common/http';
import { CommonResponse, pagingfilter } from '../../Models/shared';

@Injectable()
export class ContactsService {
    constructor(private http: HttpClient){}

    getUrl = 'http://leadapp.crowdthem.com/api/Contacts/GetContacts'
    saveUrl = 'http://pumpapi.crowdthem.com/api/PumpsAPI/SavePump'

    // TODO: Change paging type to pagingFilter when api is ready
    fetchContacts(paging: any) {
        return this.http.post(this.getUrl,paging)
    }
    saveContact(contact) {
        return this.http.post(this.saveUrl, contact)
    }
}