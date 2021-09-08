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
        container: "#treant-id"
      },
      nodeStructure: {
      }
    };
    if (this.boss !== null && this.boss != undefined) {
      tree["nodeStructure"] = {
        text: {
          name: this.boss.name,
          lastName: this.boss.lastName  
        },
        children: []
      }
      this.boss.subordinates.forEach(x => {
        this.addChildren(tree["nodeStructure"]["children"], x);
      });
      (() => { Treant(tree) })();
    }
  }

  private addChildren(tree: any, supervisor: Employee): void {
    let data = {
      text: {
        name: supervisor.name,
        lastName: supervisor.lastName,
      },
      children: []
    }
    tree.push(data);
    supervisor.subordinates.forEach(x => {
      this.addChildren(data["children"], x);
    });
  }

  private setChildrens(supervisor: Employee): any {
    let list: any[] = [];
    supervisor.subordinates.forEach(x => {
      list.push({
        name: x.name,
        lastName: x.lastName
      })
    })
    return list;
  }

  public getBoss(): void {
    this.employeeService.getBoss().subscribe(
      (response: Employee) => {
        this.boss = response;
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
