//* Default Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

//* Components
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TopicsComponent } from './topics/topics.component';
import { HeaderComponent } from './topics/header/header.component';
import { BoardsComponent } from './topics/boards/boards.component';



@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    HomeComponent,
    UsersComponent,
    TopicsComponent,
    HeaderComponent,
    BoardsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
