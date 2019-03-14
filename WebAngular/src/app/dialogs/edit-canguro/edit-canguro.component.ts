import { Component, OnInit, Inject } from '@angular/core';
import { Canguros } from 'src/app/responses/conguros.response';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CangurosService } from 'src/app/services/canguro.service';

@Component({
  selector: 'app-edit-canguro',
  templateUrl: './edit-canguro.component.html',
  styleUrls: ['./edit-canguro.component.scss']
})
export class EditCanguroComponent implements OnInit {

  canguros: Canguros;
  public canguroForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cangurosService: CangurosService,
    public dialogRef: MatDialogRef<EditCanguroComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.canguroForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      photo: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      studies: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])]
    });
    console.log(this.data);
  }

  editCanguros() {
    const canguros = <Canguros>this.canguroForm.value
    this.cangurosService.editCanguros(this.data.element.id, canguros).subscribe(
      canguro => {
        this.dialogRef.close();
      }
    );
  }
}
