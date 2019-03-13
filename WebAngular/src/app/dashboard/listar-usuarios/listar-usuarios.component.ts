import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/responses/user.response';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteUserComponent } from 'src/app/dialogs/delete-user/delete-user.component';
import { EditUserComponent } from 'src/app/dialogs/edit-user/edit-user.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Email', 'Name', 'Role', 'Opciones'];
  dataSource: Users[];
  //users: Users[];

  constructor (private userService: UserService, 
    private loginService: LoginService,
    private snackBar: MatSnackBar, 
    private router: Router, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(listUsers => {
      this.dataSource = listUsers;
      this.snackBar.open('Listado de usuarios cargado', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, 
    error =>  {
      this.snackBar.open('Error al obtener los usuarios', 'X', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }

  openDialogoEditarUser(users: Users){
    const dialogoEditUser = this.dialog.open(EditUserComponent, {
      data:{
        element: users
      }
    });
    dialogoEditUser.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  openDialogoEliminarUser(users: Users){
    const dialogoDeleteUser = this.dialog.open(DeleteUserComponent, {
      data:{
        element: users
      }
    });

    dialogoDeleteUser.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
}
