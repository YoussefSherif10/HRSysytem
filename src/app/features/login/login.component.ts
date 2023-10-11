import { Component, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { DataService } from "src/services/data.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnDestroy {
  email = new FormControl("", [Validators.required, Validators.email]);
  errorMsg!: string;
  dataSubscription!: Subscription;

  constructor(private dataService: DataService, private router: Router) {}

  login() {
    const email = String(this.email.value);
    this.dataSubscription = this.dataService.login(email).subscribe({
      next: (response: any) => {
        localStorage.setItem("token", response["token"]);
        this.router.navigate(["/"]);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errorMsg =
            "Not authorized ask an HR employee to create a mail for you";
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
