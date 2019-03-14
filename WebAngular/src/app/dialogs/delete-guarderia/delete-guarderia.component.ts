import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-guarderia',
  templateUrl: './delete-guarderia.component.html',
  styleUrls: ['./delete-guarderia.component.scss']
})
export class DeleteGuarderiaComponent implements OnInit {

  eliminar : string;
  dataSource: Canguros[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteCanguroComponent>, 
    private cangurosService: CangurosService, 
    private fb: FormBuilder, 
    public snackBar: MatSnackBar, 
    private router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }
  
  deleteCanguro() {
    this.cangurosService.deleteCanguros(this.data.element.id).subscribe(
      canguro => {
      this.snackBar.open(`Eliminando ${this.data.element.name}`, 'Cerrar', {
        duration: 3000,
      });
    })
  }

  comprobeDelete(){
    if(this.eliminar === "ELIMINAR")
      return true;
    else
      return false;   
  }

}
