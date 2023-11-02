import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent,ConfirmationDialog } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { SubheaderComponent } from './subheader/subheader.component';
import { DialogContentExampleDialog, ListaPreventiviComponent } from './lista-preventivi/lista-preventivi.component';
import { ListaContattiComponent } from './lista-contatti/lista-contatti.component';
import { AmministratoreComponent, Sondaggiodialog } from './amministratore/amministratore.component';
import { DettaglioContattiComponent } from './dettaglio-contatti/dettaglio-contatti.component';
import { InfoAggiuntiveComponent } from './info-aggiuntive/info-aggiuntive.component';
import { ChiamateComponent, FormatTimePipe } from './chiamate/chiamate.component';
import { AllegatiContattiComponent } from './allegati-contatti/allegati-contatti.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DndDirective } from './dnd.directive';
import { DatiContattoDoppioComponent } from './dati-contatto-doppio/dati-contatto-doppio.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UploadContattiComponent } from './upload-contatti/upload-contatti.component';
import { ListaConfermeOrdineComponent } from './lista-conferme-ordine/lista-conferme-ordine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AllegatiConfermaOrdineComponent } from './allegati-conferma-ordine/allegati-conferma-ordine.component';
import { FatturazioneComponent } from './fatturazione/fatturazione.component';
import localeIt from '@angular/common/locales/it';
import { SpedizioneComponent } from './spedizione/spedizione.component';
import { ListaBolleComponent } from './lista-bolle/lista-bolle.component';
import { TagComponent } from './tag/tag.component';
import { MagazzinoComponent } from './magazzino/magazzino.component';
import { ReplacePipe } from './replace.pipe';
import { MenuBuildComponent } from './menu-build/menu-build.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NuovoModelloOffertaComponent } from './nuovo-modello-offerta/nuovo-modello-offerta.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TestcheckComponent } from './testcheck/testcheck.component';
import { DatiAziendaPartnerComponent } from './dati-azienda-partner/dati-azienda-partner.component';
import { PreventiviComponent } from './preventivi/preventivi.component';
import { OperatoreComponent } from './operatore/operatore.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CustomDateAdapter } from './custom-date-adapter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCommonModule } from '@angular/material/core';
import { DateFormat } from "./date-format";
import { ListaFattureComponent } from './lista-fatture/lista-fatture.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { RiepilogoFattureFornitoriComponent } from './riepilogo-fatture-fornitori/riepilogo-fatture-fornitori.component';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { WebinarComponent } from './webinar/webinar.component';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MarketingComponent } from './marketing/marketing.component';
import { CampioniComponent } from './campioni/campioni.component';
import { AppuntiComponent } from './appunti/appunti.component';




registerLocaleData(localeIt);

@NgModule({
    declarations: [
        AppComponent,
        FormatTimePipe,
        LoginComponent,
        HomeComponent,
        HeaderComponent,
        SubheaderComponent,
        ListaPreventiviComponent,
        ListaContattiComponent,
        AmministratoreComponent,
        Sondaggiodialog,
        DettaglioContattiComponent,
        InfoAggiuntiveComponent,
        ChiamateComponent,
        ConfirmationDialog,
        AllegatiContattiComponent,
        DialogConfirmComponent,
        DndDirective,
        DatiContattoDoppioComponent,
        SendMailComponent,
        DialogBoxComponent,
        DialogContentExampleDialog,
        UploadContattiComponent,
        ListaConfermeOrdineComponent,
        AllegatiConfermaOrdineComponent,
        FatturazioneComponent,
        SpedizioneComponent,
        ListaBolleComponent,
        TagComponent,
        MagazzinoComponent,
        ReplacePipe,
        MenuBuildComponent,
        NuovoModelloOffertaComponent,
        ConfirmDialogComponent,
        TestcheckComponent,
        DatiAziendaPartnerComponent,
        PreventiviComponent,
        OperatoreComponent,
        AreaRiservataComponent,
        CalendarioComponent,
        ListaFattureComponent,
        RiepilogoFattureFornitoriComponent,
        WebinarComponent,
        MarketingComponent,
        CampioniComponent,
        AppuntiComponent

    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatTabsModule,
        MatListModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatExpansionModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatTreeModule,
        MatButtonToggleModule,
        MatCommonModule,
        MatTableExporterModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatMomentModule,
        MatMenuModule

    ],
    providers: [{ provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }, { provide: DateAdapter, useClass: DateFormat }],
    bootstrap: [AppComponent],
    entryComponents: [FaIconComponent,ChiamateComponent,ListaPreventiviComponent],
})
export class AppModule {

    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale("en-in"); // DD/MM/YYYY
    }
}
