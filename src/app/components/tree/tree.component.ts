import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ViewEncapsulation } from '@angular/core'

declare var Treant: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  public boss?: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getBoss();
  }

  private getEmployees(): void {
    var tree: any = {
      chart: {
        container: "#treant-id",
        connectors: { type: "straight" },
        node: { HTMLclass: "node" }
      },
      nodeStructure: {
      }
    };
    if (this.boss !== null && this.boss != undefined) {
      tree["nodeStructure"] = {
        image: this.boss.url,
        text: {
          id: "ID: " + this.boss.id,
          name: this.boss.name.concat(" ", this.boss.lastName == null ? "" : this.boss.lastName),
          email: this.boss.email == null ? "" : this.boss.email,
          phoneNumber: this.boss.phoneNumber == null ? "" : this.boss.phoneNumber,
          description: this.boss.description == null ? "" : this.boss.description 
        },
        children: []
      }
      this.boss.subordinates.forEach(x => {
        this.addChildren(tree["nodeStructure"]["children"], x);
      });
      Treant(tree);
      console.log(tree);
    }
  }

  private addChildren(tree: any, supervisor: Employee): void {
    let data = {
      image: supervisor.url,
      text: {
        id: "ID: " + supervisor.id,
        name: supervisor.name.concat(" ", supervisor.lastName == null ? "" : supervisor.lastName),
        email: supervisor.email == null ? "" : supervisor.email,
          phoneNumber: supervisor.phoneNumber == null ? "" : supervisor.phoneNumber,
          description: supervisor.description == null ? "" : supervisor.description         
      },
      children: []
    }
    tree.push(data);
    supervisor.subordinates.forEach(x => {
      this.addChildren(data["children"], x);
    });
  }

  public getBoss(): void {
    this.employeeService.getBoss().subscribe(
      (response: Employee) => {
        this.boss = response;
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getBoss();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteEmployee(deleteForm: NgForm): void {
    this.employeeService.deleteEmployee(deleteForm.value.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getBoss();
        deleteForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert("Employee with id " + deleteForm.value.id + " doesnt exists or has subordinates");
        console.log(error.message);
      }
    );
  }

  public onDownloadCSV(): void {
    this.employeeService.downloadCSV().subscribe(
      (response: void) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
