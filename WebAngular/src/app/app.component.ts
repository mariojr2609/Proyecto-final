import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from './services/upload.service';
import { AddPhotoComponent } from './dialogs/add-photo/add-photo.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'file-upload';

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService,
    public snackBar: MatSnackBar) { }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(AddPhotoComponent,
      {
        width: '50%',
        height: '50%',
        data: { id: 1 }
      });
    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open(
        'The file was successfully uploaded', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
    });
  }
}
