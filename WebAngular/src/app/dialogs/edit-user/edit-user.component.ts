import { Component, OnInit, Inject } from '@angular/core';
import { Users } from 'src/app/responses/user.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  usuarios: Users;
  public userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)public data: any,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      id: [this.data.element.id, Validators.compose([Validators.required])],
      email: [this.data.element.email, Validators.compose([Validators.required])],
      password: [this.data.element.password, Validators.compose([Validators.required])],
      name: [this.data.element.name, Validators.compose([Validators.required])],
      role: [this.data.element.role, Validators.compose([Validators.required])],
      picture: [this.data.element.picture, Validators.compose([Validators.required])]
    });

  }
  saveUser() {
    this.userService.updateUsers(this.usuarios).subscribe(user => {
      this.dialogRef.close();
    });
  }

  editUser() {
    this.userService.editUsers(this.data.element.id, this.userForm.value).subscribe(response => {
      this.dialogRef.close();
    }, 
    error => {
      console.log(error);
    })
  }
}
