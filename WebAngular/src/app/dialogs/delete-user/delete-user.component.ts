import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  eliminar : string;
  dataSource: Usuarios[];

  constructor(public dialogRef: MatDialogRef<EliminarUsuarioComponent>, 
    private usuarioService: UsuarioService, 
    private fb: FormBuilder, 
    public snackBar: MatSnackBar, 
    private router : Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
        
  }
  deleteUsuario() {
    this.usuarioService.deleteUsuarios(this.data.element.id).subscribe( usuario => {
      this.snackBar.open(`Eliminando ${this.data.element.name}`, 'Cerrar', {
        duration: 3000,
      });
    })
  }

  comprobarEliminar(){
    if(this.eliminar === "ELIMINAR")
      return true;
    else
      return false;   
  }

}
