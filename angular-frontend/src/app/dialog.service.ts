import { DialogComponent } from "./dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class Dialog{
    constructor(private dialog:MatDialog){}
    confirmationDialog(message: string, title: string):Observable<boolean>{
        const dialogRef = this.dialog.open(DialogComponent, {data:{message,title}})
        return dialogRef.afterClosed()
    }
}