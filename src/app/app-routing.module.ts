import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAdminComponent } from './views/admins/create-admin/create-admin.component';
import { IndexAdminComponent } from './views/admins/index-admin/index-admin.component';
import { UpdateAdminComponent } from './views/admins/update-admin/update-admin.component';
import { CreateDeptComponent } from './views/departments/create-dept/create-dept.component';
import { IndexDeptComponent } from './views/departments/index-dept/index-dept.component';
import { SearchDeptComponent } from './views/departments/search-dept/search-dept.component';
import { CreateEmpComponent } from './views/employees/create-emp/create-emp.component';
import { IndexEmpComponent } from './views/employees/index-emp/index-emp.component';
import { SearchEmpComponent } from './views/employees/search-emp/search-emp.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/shared/not-found/not-found.component';
// import { SidebarComponent } from './views/shared/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'logIn', component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      //dept childs
      {
        path: 'add-department', component: CreateDeptComponent
      },
      {
        path: 'search-department', component: SearchDeptComponent
      },
      {
        path: 'show-all-departments', component: IndexDeptComponent
      },
      // admin routes
      {
        path: 'add-user', component: CreateAdminComponent
      },
      {
        path: 'show-all-users', component: IndexAdminComponent
      },
      {
        path:'update-user/:id', component: UpdateAdminComponent
      },
      // emp routes
      {
        path: 'add-employee', component: CreateEmpComponent
      },
      {
        path: 'search-employee', component: SearchEmpComponent
      },
      {
        path: 'show-all-employees', component: IndexEmpComponent
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '**', component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
