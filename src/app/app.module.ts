import { UtilService } from './service/utils.service';
import { MantisService } from './service/mantis.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ClientViewComponent } from './view/client-view/client-view.component';
import { DevViewComponent } from './view/dev-view/dev-view.component';
import { ManagerViewComponent } from './view/manager-view/manager-view.component';
import { LoaderComponent } from './component/loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateInterceptor } from 'src/environments/app.interceptor';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ClientViewComponent,
    DevViewComponent,
    ManagerViewComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [HttpClientModule,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthenticateInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
