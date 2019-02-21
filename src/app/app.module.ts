import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'hammerjs';


import { Lead } from 'app/app.component';

import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from "@angular/material";
import { ImageCropperModule } from 'ngx-image-cropper';


import { AppRoutingModule } from './app-routing.module';
import { ContactsModule } from 'areas/lead-test/lib/components/contacts.module';



@NgModule({
    declarations: [
        Lead
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        //        RouterModule.forRoot(appRoutes),
        //     AccountModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ImageCropperModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        ContactsModule

        , AppRoutingModule //routing module should be at end

    ],
    exports: [MatProgressBarModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    bootstrap: [
        Lead
    ]
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}