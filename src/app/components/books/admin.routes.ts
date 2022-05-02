import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { BooksComponent } from "./books.component";
import { UsersListComponent } from "./users-list/users-list.component";

export const adminRoutes: Routes = [
    { path: '', component: BooksComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: UsersListComponent }
]
