
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AmministratoreComponent } from './amministratore/amministratore.component';
import { MagazzinoComponent } from './magazzino/magazzino.component';
import { PreventiviComponent } from './preventivi/preventivi.component';

import { DettaglioContattiComponent } from './dettaglio-contatti/dettaglio-contatti.component';
import { MenuBuildComponent } from './menu-build/menu-build.component';
import { NuovoModelloOffertaComponent } from './nuovo-modello-offerta/nuovo-modello-offerta.component';
import { TestcheckComponent } from './testcheck/testcheck.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ListaFattureComponent } from './lista-fatture/lista-fatture.component';
import { RiepilogoFattureFornitoriComponent } from './riepilogo-fatture-fornitori/riepilogo-fatture-fornitori.component';
import { WebinarComponent } from './webinar/webinar.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CampioniComponent } from './campioni/campioni.component';
import { ListaContattiComponent } from './lista-contatti/lista-contatti.component';
import { StatOperatoriComponent } from './stat-operatori/stat-operatori.component';

/*const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'amministratore',
    component: AmministratoreComponent,
},
{
  path:'dettaglio-contatto/:id',
  component: DettaglioContattiComponent,
},
{
  path:'',
  component: LoginComponent,
},
{
  path:'home',
  component: HomeComponent,
}
]; */

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "contatti", component: ListaContattiComponent },
  { path: 'dettaglio-contatto/:id', component: DettaglioContattiComponent },
  { path: 'amministratore', component: AmministratoreComponent, },
  { path: 'magazzino', component: MagazzinoComponent, },
  { path: 'menu-build', component: MenuBuildComponent, },
  { path: 'testcheck', component: TestcheckComponent, },
  { path: 'offerte', component: PreventiviComponent, },
  { path: 'fatture', component: ListaFattureComponent, },
  { path: 'campioni', component: CampioniComponent, },
  { path: 'webinar', component: WebinarComponent, },
  { path: 'marketing', component: MarketingComponent, },
  { path: 'stat_operatori', component: StatOperatoriComponent, },
  { path: 'riepilogo-fatture-fornitori', component: RiepilogoFattureFornitoriComponent, },
  { path: 'nuovo-modello-offerta', component: NuovoModelloOffertaComponent, },
  { path: 'area-riservata/:id/:username/:password', component: AreaRiservataComponent, },
  { path: 'calendario/:id_contatto/:interesse/:psw', component: CalendarioComponent, },
  { path: "**", redirectTo: "" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
