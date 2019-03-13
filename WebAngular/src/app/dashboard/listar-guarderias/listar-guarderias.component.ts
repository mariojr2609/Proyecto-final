import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';
import { Guarderias } from 'src/app/responses/guarderias.response';
import { Users } from 'src/app/responses/user.response';
import { GuarderiasService } from 'src/app/services/guarderia.service';
import { AddGuarderiaComponent } from 'src/app/dialogs/add-guarderia/add-guarderia.component';
import { EditGuarderiaComponent } from 'src/app/dialogs/edit-guarderia/edit-guarderia.component';
import { DeleteGuarderiaComponent } from 'src/app/dialogs/delete-guarderia/delete-guarderia.component';

@Component({
  selector: 'app-listar-guarderias',
  templateUrl: './listar-guarderias.component.html',
  styleUrls: ['./listar-guarderias.component.scss']
})
export class ListarGuarderiasComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Photo', 'Phone', 'Address', 'City', 'Description', 'Location', 'Opciones'];
  dataSource: Guarderias[];
  users: Users[];

  constructor (
    private guarderiasService: GuarderiasService, 
    private snackBar: MatSnackBar, 
    public dialog: MatDialog,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getGuarderias();
   }

   getGuarderias(){
    this.guarderiasService.getGuarderias().subscribe(listGuarderias => {
      this.dataSource = listGuarderias;
      this.snackBar.open('Listado de guarderias cargado', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, 
    error =>  {
      this.snackBar.open('Error al listar los guarderias', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }

  openDialogoAnadirGuarderia() {
    const addGuarderiascomponent = this.dialog.open(AddGuarderiaComponent);
  }

  openDialogoEditarGuarderia(guarderias: Guarderias) {
    const editguarderiascomponent = this.dialog.open(EditGuarderiaComponent, {
      data:{
        element: guarderias
      }
    });
    editguarderiascomponent.afterClosed().subscribe(result => {
      this.getGuarderias();
    });
  }

  openDialogoEliminarGuarderia() {
    const eliminarguarderiascomponent = this.dialog.open(DeleteGuarderiaComponent);
  }
}
