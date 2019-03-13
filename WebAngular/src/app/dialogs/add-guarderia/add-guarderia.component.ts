import { Component, OnInit } from '@angular/core';
import { Guarderias } from 'src/app/responses/guarderias.response';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { GuarderiasService } from 'src/app/services/guarderia.service';

@Component({
  selector: 'app-add-guarderia',
  templateUrl: './add-guarderia.component.html',
  styleUrls: ['./add-guarderia.component.scss']
})
export class AddGuarderiaComponent implements OnInit {
  
    public guarderiaForm: FormGroup;
  
    constructor(
      private guarderiasService: GuarderiasService,
      public dialogRef: MatDialogRef<AddGuarderiaComponent>,
      private fb: FormBuilder) { }
  
    ngOnInit() {
      this.guarderiaForm = this.fb.group ({
        name: ['', Validators.compose([Validators.required])], 
        photo: ['' , Validators.compose ([Validators.required ])], 
        phone: ['', Validators.compose([Validators.required])],
        address: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        drescription: ['', Validators.compose([Validators.required])],
        location: ['', Validators.compose([Validators.required])],
      });
    }
  
    addGuarderias() {
      const nuevoGuarderia = <Guarderias>this.guarderiaForm.value;
      this.guarderiasService.addGuarderias(nuevoGuarderia).subscribe(
        recurso => {
          this.dialogRef.close();
        }
      );
    }
}
