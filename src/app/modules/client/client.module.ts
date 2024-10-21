import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    HomeComponent
  ]
})
export class ClientModule { }
