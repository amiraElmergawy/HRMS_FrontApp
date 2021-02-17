import "@angular/compiler"
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from "angular2-flash-messages";
// import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import 'attention_seekers/shake.css';

import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/shared/not-found/not-found.component';
import { HomeComponent } from './views/home/home.component';
import { SidebarComponent } from './views/shared/sidebar/sidebar.component';
import { CreateDeptComponent } from './views/departments/create-dept/create-dept.component';
import { HTTPInterceptor } from './services/http.interceptor';
import { FooterComponent } from './views/shared/footer/footer.component';
import { SearchDeptComponent } from './views/departments/search-dept/search-dept.component';
import { IndexDeptComponent } from './views/departments/index-dept/index-dept.component';
import { CreateAdminComponent } from './views/admins/create-admin/create-admin.component';
import { IndexAdminComponent } from './views/admins/index-admin/index-admin.component';
import { CreateEmpComponent } from './views/employees/create-emp/create-emp.component';
import { IndexEmpComponent } from './views/employees/index-emp/index-emp.component';
import { SearchEmpComponent } from './views/employees/search-emp/search-emp.component';
import { NgxPaginationModule } from "ngx-pagination";
import { UpdateAdminComponent } from './views/admins/update-admin/update-admin.component';
import { SimpleModalModule } from "ngx-simple-modal";
import { ShowDeptComponent } from './views/departments/show-dept/show-dept.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    SidebarComponent,
    CreateDeptComponent,
    FooterComponent,
    SearchDeptComponent,
    IndexDeptComponent,
    CreateAdminComponent,
    IndexAdminComponent,
    CreateEmpComponent,
    IndexEmpComponent,
    SearchEmpComponent,
    UpdateAdminComponent,
    ShowDeptComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    SimpleModalModule
    // NgbModule,
    // ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
