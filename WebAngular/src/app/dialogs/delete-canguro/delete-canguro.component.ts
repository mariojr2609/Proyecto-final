import { Component, OnInit, Inject } from '@angular/core';
import { Canguros } from 'src/app/responses/conguros.response';
import { MatDialogRef, MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CangurosService } from 'src/app/services/canguro.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-canguro',
  templateUrl: './delete-canguro.component.html',
  styleUrls: ['./delete-canguro.component.scss']
})
export class DeleteCanguroComponent implements OnInit {

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
