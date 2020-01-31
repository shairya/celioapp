import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { SecureInnerPagesGuard } from './service/secure-inner-pages.guard';
import { HeaderComponent } from './components/common/header/header.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [AuthGuard, AuthService, SecureInnerPagesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
