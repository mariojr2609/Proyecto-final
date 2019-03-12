import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-guarderias',
  templateUrl: './listar-guarderias.component.html',
  styleUrls: ['./listar-guarderias.component.scss']
})
export class ListarGuarderiasComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Photo', 'Address', 'Zipcode', 'City', 'Province','Description', 'Location', 'Opciones'];
  dataSource: Guarderias[];
  usuarios: Usuarios[];

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
    const anadirGuarderiascomponent = this.dialog.open(AnadirGuarderiaComponent);
  }

  openDialogoEditarGuarderia(guarderia: Guarderia) {
    const editarguarderiascomponent = this.dialog.open(EditarGuarderiaComponent, {
      data:{
        element: Guarderias
      }
    });
    editarguarderiascomponent.afterClosed().subscribe(result => {
      this.getGuarderias();
    });
  }

  openDialogoEliminarGuarderia() {
    const eliminarguarderiascomponent = this.dialog.open(EliminarGuarderiaComponent);
  }
}
