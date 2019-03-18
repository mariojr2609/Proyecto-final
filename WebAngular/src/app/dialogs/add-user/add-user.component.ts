import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Users } from 'src/app/responses/user.response';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private userService: UserService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group ({
      email: ['' , Validators.compose ([Validators.required ])],  
      password: ['', Validators.compose([Validators.required])],
      name: ['' , Validators.compose ([Validators.required ])],
      role: ['', Validators.compose([Validators.required])],
    });
  }

  addUser() {
    const nuevoUser = <Users>this.userForm.value;
    this.userService.addUsers(nuevoUser).subscribe(
      user => {
        this.dialogRef.close();
      }
    );
  }
}
