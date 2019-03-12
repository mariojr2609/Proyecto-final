import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-canguros',
  templateUrl: './listar-canguros.component.html',
  styleUrls: ['./listar-canguros.component.scss']
})
export class ListarCangurosComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Photo', 'Age', 'Address', 'Zipcode', 'City', 'Province','Description', 'Studies', 'Location', 'Opciones'];
  dataSource: Canguros[];
  usuarios: Usuarios[];

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
    const anadircangurocomponent = this.dialog.open(AnadirCanguroComponent);
  }

  openDialogoEditarCanguro(canguros: Canguros) {
    const editarcanguroscomponent = this.dialog.open(EditarCanguroComponent, {
      data:{
        element: Canguros
      }
    });
    editarcanguroscomponent.afterClosed().subscribe(result => {
      this.getCanguros();
    });
  }

  openDialogoEliminarCanguro() {
    const eliminarcanguroscomponent = this.dialog.open(EliminarCangurosComponent);
  }
}
