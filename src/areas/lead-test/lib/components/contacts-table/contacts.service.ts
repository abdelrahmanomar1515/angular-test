import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../../Models/contact';
import { HttpClient } from '@angular/common/http';
import { CommonResponse } from '../../Models/shared';

@Injectable()
export class ContactsService {
    constructor(private http: HttpClient){}
    private contacts:Contact[] = []
    getUrl = 'http://leadapp.crowdthem.com/api/Contacts/GetContacts'
    saveUrl = 'http://pumpapi.crowdthem.com/api/PumpsAPI/SavePump'
    contactsChanged = new Subject<Contact[]>()

    updateContacts(contacts:Contact[]){
        this.contacts = contacts
        this.contactsChanged.next(this.contacts.slice())
    }

    fetchContacts() {
        this.http.get(this.getUrl).subscribe(
            (res: CommonResponse) => {
                this.updateContacts(res.Data)
            }
        )
    }
    saveContact(contact) {
        return this.http.post(this.saveUrl, contact)
    }
}