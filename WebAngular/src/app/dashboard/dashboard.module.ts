import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatInputModule, MAT_DIALOG_DEFAULT_OPTIONS, MatSnackBarModule, MatDialogModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

import { LoginService } from '../services/login.service';

import { ListarComponent } from '../dashboard/listar/listar.component';

@NgModule({
  
  declarations: [ 
    DashboardComponent,
    ListarComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatTableModule,
    MatInputModule, 
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
  ],

  entryComponents:[
  ],

  providers: [
    LoginService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}
    }
  ],
})

export class DashboardModule {}
