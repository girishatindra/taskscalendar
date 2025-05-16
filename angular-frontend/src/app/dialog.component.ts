import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-container',
  templateUrl: "dialog.component.html",
  styleUrl: "../styles.css",
})

export class DialogComponent{
constructor(public dialogRef:MatDialogRef<DialogComponent>,
@Inject(MAT_DIALOG_DATA) public data:{message:string, title:string}
 ){}

 onConfirm(): void{
    this.dialogRef.close(true)
 }

 Oncancel(): void{
    this.dialogRef.close(false)
 }
}

