import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationDialog, HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import localeIt from '@angular/common/locales/it';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AllegatiConfermaOrdineComponent } from './allegati-conferma-ordine/allegati-conferma-ordine.component';
import { AllegatiContattiComponent } from './allegati-contatti/allegati-contatti.component';
import { AmministratoreComponent, Sondaggiodialog } from './amministratore/amministratore.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ChiamateComponent, FormatTimePipe } from './chiamate/chiamate.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DateFormat } from "./date-format";
import { DatiAziendaPartnerComponent } from './dati-azienda-partner/dati-azienda-partner.component';
import { DatiContattoDoppioComponent } from './dati-contatto-doppio/dati-contatto-doppio.component';
import { DettaglioContattiComponent } from './dettaglio-contatti/dettaglio-contatti.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DndDirective } from './dnd.directive';
import { FatturazioneComponent } from './fatturazione/fatturazione.component';
import { InfoAggiuntiveComponent } from './info-aggiuntive/info-aggiuntive.component';
import { ListaBolleComponent } from './lista-bolle/lista-bolle.component';
import { ListaConfermeOrdineComponent } from './lista-conferme-ordine/lista-conferme-ordine.component';
import { ListaContattiComponent } from './lista-contatti/lista-contatti.component';
import { ListaFattureComponent } from './lista-fatture/lista-fatture.component';
import { DialogContentExampleDialog, ListaPreventiviComponent } from './lista-preventivi/lista-preventivi.component';
import { MagazzinoComponent } from './magazzino/magazzino.component';
import { MenuBuildComponent } from './menu-build/menu-build.component';
import { NuovoModelloOffertaComponent } from './nuovo-modello-offerta/nuovo-modello-offerta.component';
import { OperatoreComponent } from './operatore/operatore.component';
import { PreventiviComponent } from './preventivi/preventivi.component';
import { ReplacePipe } from './replace.pipe';
import { RiepilogoFattureFornitoriComponent } from './riepilogo-fatture-fornitori/riepilogo-fatture-fornitori.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { SpedizioneComponent } from './spedizione/spedizione.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { TagComponent } from './tag/tag.component';
import { TestcheckComponent } from './testcheck/testcheck.component';
import { UploadContattiComponent } from './upload-contatti/upload-contatti.component';
import { WebinarComponent } from './webinar/webinar.component';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppuntiComponent } from './appunti/appunti.component';
import { CampioniComponent } from './campioni/campioni.component';
import { AutocompleteRestComponent } from './components/autocomplete-rest/autocomplete-rest.component';
import { MarketingComponent } from './marketing/marketing.component';
import { OffertaComponent } from './offerta/offerta.component';
import { StatOperatoriComponent } from './stat-operatori/stat-operatori.component';

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
        AppuntiComponent,
        StatOperatoriComponent,
        OffertaComponent,
        AutocompleteRestComponent

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
        MatAutocompleteModule,
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
    entryComponents: [FaIconComponent, ChiamateComponent, ListaPreventiviComponent],
})
export class AppModule {

    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale("en-in"); // DD/MM/YYYY
    }
}
