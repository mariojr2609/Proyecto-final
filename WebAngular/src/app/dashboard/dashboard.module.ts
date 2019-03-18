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
import { UploadService } from '../services/upload.service';

import { GuarderiasService } from '../services/guarderia.service';
import { ListarGuarderiasComponent } from './listar-guarderias/listar-guarderias.component';
import { AddGuarderiaComponent } from '../dialogs/add-guarderia/add-guarderia.component';
import { EditGuarderiaComponent } from '../dialogs/edit-guarderia/edit-guarderia.component';
import { DeleteGuarderiaComponent } from '../dialogs/delete-guarderia/delete-guarderia.component';

import { CangurosService } from '../services/canguro.service';
import { ListarCangurosComponent } from './listar-canguros/listar-canguros.component';
import { AddPhotoComponent } from '../dialogs/add-photo/add-photo.component';
import { AddCanguroComponent } from '../dialogs/add-canguro/add-canguro.component';
import { EditCanguroComponent } from '../dialogs/edit-canguro/edit-canguro.component';
import { DeleteCanguroComponent } from '../dialogs/delete-canguro/delete-canguro.component';

import { UserService } from '../services/user.service';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { AddUserComponent } from '../dialogs/add-user/add-user.component';
import { EditUserComponent } from '../dialogs/edit-user/edit-user.component';
import { DeleteUserComponent } from '../dialogs/delete-user/delete-user.component';

@NgModule({
  
  declarations: [ 
    DashboardComponent,

    ListarGuarderiasComponent,
    AddGuarderiaComponent,
    AddPhotoComponent,
    EditGuarderiaComponent,
    DeleteGuarderiaComponent,

    ListarCangurosComponent,
    AddCanguroComponent,
    EditCanguroComponent,
    DeleteCanguroComponent,

    ListarUsuariosComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent
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
    AddGuarderiaComponent,
    EditGuarderiaComponent,
    DeleteGuarderiaComponent,
    AddCanguroComponent,
    AddPhotoComponent,
    EditCanguroComponent,
    DeleteCanguroComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent
  ],

  providers:[
    LoginService,
    GuarderiasService,
    CangurosService,
    UserService,
    UploadService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}
    },
  ],
})

export class DashboardModule {}
