import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/responses/user.response';
import { Canguros } from 'src/app/responses/conguros.response';
import { CangurosService } from 'src/app/services/canguro.service';
import { EditCanguroComponent } from 'src/app/dialogs/edit-canguro/edit-canguro.component';
import { AddCanguroComponent } from 'src/app/dialogs/add-canguro/add-canguro.component';
import { DeleteCanguroComponent } from 'src/app/dialogs/delete-canguro/delete-canguro.component';

@Component({
  selector: 'app-listar-canguros',
  templateUrl: './listar-canguros.component.html',
  styleUrls: ['./listar-canguros.component.scss']
})
export class ListarCangurosComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Photo', 'Phone', 'Age', 'Address', 'City', 'Studies', 'Location', 'Opciones'];
  dataSource: Canguros;
  usuarios: Users[];

  constructor (
    private cangurosService: CangurosService, 
    private snackBar: MatSnackBar, 
    public dialog: MatDialog,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getCanguros();
   }

   getCanguros(){
    this.cangurosService.getCanguros().subscribe(listCanguros => {
      this.dataSource = listCanguros;
      this.snackBar.open('Listado de canguros cargado', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, 
    error =>  {
      this.snackBar.open('Error al listar los canguros', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }

  openDialogoAnadirCanguro() {
    const anadircangurocomponent = this.dialog.open(AddCanguroComponent);
  }

  openDialogoEditarCanguro(canguros: Canguros) {
    const editarcanguroscomponent = this.dialog.open(EditCanguroComponent, {
      data:{
        element: canguros
      }
    });
    editarcanguroscomponent.afterClosed().subscribe(result => {
      this.getCanguros();
    });
  }

  openDialogoEliminarCanguro() {
    const eliminarcanguroscomponent = this.dialog.open(DeleteCanguroComponent);
  }
}
