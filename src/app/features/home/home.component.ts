import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DataService } from "src/services/data.service";
import { Employee } from "src/models/Employee";
import { Subscription } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { DeleteMsgComponent } from "src/app/common/delete-msg/delete-msg.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormComponent } from "src/app/common/form/form.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    DeleteMsgComponent,
    MatDialogModule,
    FormComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["name", "email", "group", "edit", "delete"];
  dataSource!: MatTableDataSource<Employee>;
  dataSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataService
      .getEmployees()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(id: string) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateEmployee(id, result).subscribe((updated) => {
          this.dataSource.data = this.dataSource.data.map((employee) => {
            if (employee._id === updated._id) {
              return updated;
            }
            return employee;
          });
        });
      }
    });
  }

  deleteEmployee(id: string) {
    console.log(id);
    const dialogRef = this.dialog.open(DeleteMsgComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.deleteEmployee(id).subscribe((deleted) => {
          this.dataSource.data = this.dataSource.data.filter(
            (employee) => employee._id !== deleted._id
          );
        });
      }
    });
  }

  createEmployee() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.createEmployee(result).subscribe((created) => {
          this.dataSource.data = [...this.dataSource.data, created];
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
