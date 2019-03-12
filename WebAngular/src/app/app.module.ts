import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BidiModule } from '@angular/cdk/bidi';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';

import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  NotificationComponent,
  OptionsComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
} from './core';
import { AddGuarderiaComponent } from './dialogs/add-guarderia/add-guarderia.component';
import { AddCanguroComponent } from './dialogs/add-canguro/add-canguro.component';
import { EditGuarderiaComponent } from './dialogs/edit-guarderia/edit-guarderia.component';
import { EditCanguroComponent } from './dialogs/edit-canguro/edit-canguro.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { DeleteCanguroComponent } from './dialogs/delete-canguro/delete-canguro.component';
import { DeleteGuarderiaComponent } from './dialogs/delete-guarderia/delete-guarderia.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    AddGuarderiaComponent,
    AddCanguroComponent,
    EditGuarderiaComponent,
    EditCanguroComponent,
    EditUserComponent,
    DeleteUserComponent,
    DeleteCanguroComponent,
    DeleteGuarderiaComponent,
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    FlexLayoutModule,
    BidiModule,
    AgmCoreModule.forRoot({apiKey: 'YOURAPIKEY'}),
    PerfectScrollbarModule,
    DashboardModule,
    MatDialogModule,
  ],

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
