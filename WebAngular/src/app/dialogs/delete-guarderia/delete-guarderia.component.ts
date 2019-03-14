import { Component, OnInit, Inject } from '@angular/core';
import { Guarderias } from 'src/app/responses/guarderias.response';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { GuarderiasService } from 'src/app/services/guarderia.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-guarderia',
  templateUrl: './delete-guarderia.component.html',
  styleUrls: ['./delete-guarderia.component.scss']
})
export class DeleteGuarderiaComponent implements OnInit {

  delete: string;
  dataSource: Guarderias[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteGuarderiaComponent>,
    private guarderiasService: GuarderiasService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  deleteGuarderia() {
    this.guarderiasService.deleteGuarderias(this.data.element.id).subscribe(
      guarderia => {
        this.snackBar.open(`Removing ${this.data.element.name}`, 'Close', {
          duration: 3000,
        });
      })
  }

  comprobeDelete() {
    if (this.delete === "DELETE")
      return true;
    else
      return false;
  }
}
