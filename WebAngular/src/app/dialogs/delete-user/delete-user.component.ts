import { Component, OnInit, Inject } from '@angular/core';
import { Users } from 'src/app/responses/user.response';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  delete: string;
  dataSource: Users[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() { }

  deleteUser() {
    this.userService.deleteUsers(this.data.element.id).subscribe(user => {
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
