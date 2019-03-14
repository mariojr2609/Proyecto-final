import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guarderias } from 'src/app/responses/guarderias.response';
import { GuarderiasService } from 'src/app/services/guarderia.service';

@Component({
  selector: 'app-edit-guarderia',
  templateUrl: './edit-guarderia.component.html',
  styleUrls: ['./edit-guarderia.component.scss']
})
export class EditGuarderiaComponent implements OnInit {

  guarderias: Guarderias;
  public guarderiaForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private guarderiasService: GuarderiasService,
    public dialogRef: MatDialogRef<EditGuarderiaComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.guarderiaForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      photo: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      desciption: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])]
    });
    console.log(this.data);
  }

  editGuarderias() {
    const guarderias = <Guarderias>this.guarderiaForm.value
    this.guarderiasService.editGuarderias(this.data.element.id, guarderias).subscribe(
      canguro => {
        this.dialogRef.close();
      }
    );
  }
}
