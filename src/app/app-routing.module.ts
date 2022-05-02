import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoutes } from './components/books/admin.routes';
import { HomeBooksComponent } from './components/books/home-books.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailComponent } from './features/book-detail/book-detail.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: 'book', component: HomeBooksComponent, children: adminRoutes, canActivate: [LoginGuard] },
  { path: '', component: HomeComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
