import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
    providedIn:'root'
})

export class Message{
 constructor(private snackbar:MatSnackBar) { }

 open(message: string, action: string = '', config: MatSnackBarConfig = {}){
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    }
 this.snackbar.open(message, action || undefined, config || defaultConfig)
 }

}