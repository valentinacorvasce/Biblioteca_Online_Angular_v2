import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-list',
  template: `
    <div class="container my-5">
      <div class="col-md-12 my-5">
        <div>
          <a [routerLink]="['/book/']" class="btn btn-light mx-3">Back</a>
          <a [routerLink]="['/book/register']" class="btn btn-success">New User</a>
        </div>
      </div>

      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users | async;">
                <th scope="row">{{user.id}}</th>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

}
