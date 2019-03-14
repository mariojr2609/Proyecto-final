import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  usuarios: Usuarios;
  public usuarioForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: any,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarUsuarioComponent>) { }

  ngOnInit() {

    this.usuarioForm = this.fb.group({
      id: [this.data.element.id, Validators.compose([Validators.required])],
      name: [this.data.element.name, Validators.compose([Validators.required])],
      email: [this.data.element.email, Validators.compose([Validators.required])],
      password: [this.data.element.password, Validators.compose([Validators.required])],
      phone: [this.data.element.phone, Validators.compose([Validators.required])],
      notes: [this.data.element.notes, Validators.compose([Validators.required])]

    });

  }
  saveUsuario() {
    this.usuarioService.updateUsuario(this.usuarios).subscribe(usuario => {
      this.dialogRef.close();
    });
  }

  editUsuario() {
    this.usuarioService.editUsuario(this.data.element.id, this.usuarioForm.value).subscribe(response => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    }
    )
  }
}
