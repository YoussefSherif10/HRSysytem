import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-delete-msg",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: "./delete-msg.component.html",
})
export class DeleteMsgComponent {}
