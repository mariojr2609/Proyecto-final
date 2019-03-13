import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CangurosService } from 'src/app/services/canguro.service';
import { MatDialogRef } from '@angular/material';
import { Canguros } from 'src/app/responses/conguros.response';

@Component({
  selector: 'app-add-canguro',
  templateUrl: './add-canguro.component.html',
  styleUrls: ['./add-canguro.component.scss']
})
export class AddCanguroComponent implements OnInit {

  public canguroForm: FormGroup;
  
    constructor(
      private cangurosService: CangurosService,
      public dialogRef: MatDialogRef<AddCanguroComponent>,
      private fb: FormBuilder) { }
  
    ngOnInit() {
      this.canguroForm = this.fb.group ({
        name: ['', Validators.compose([Validators.required])], 
        photo: ['' , Validators.compose ([Validators.required ])], 
        phone: ['', Validators.compose([Validators.required])],
        age: ['', Validators.compose([Validators.required])],
        address: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        studies: ['', Validators.compose([Validators.required])],
        location: ['', Validators.compose([Validators.required])],
      });
    }
  
    addGuarderias() {
      const nuevoGuarderia = <Canguros>this.canguroForm.value;
      this.cangurosService.addCanguros(nuevoGuarderia).subscribe(
        recurso => {
          this.dialogRef.close();
        }
      );
    }
}
