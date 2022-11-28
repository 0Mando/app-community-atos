
//* Default Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//* Components
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TopicsComponent } from './topics/topics.component';
import { HeaderComponent } from './topics/header/header.component';
import { BoardsComponent } from './topics/boards/boards.component';
import { ChannelsComponent } from './topics/channels/channels.component';
import { FormularyComponent } from './topics/formulary/formulary.component';

//* Pipe
import { ShortenModPipe } from './../infrastructure/pipes/shorten-mod.pipe';
import { ParentBoardsPipe } from './../infrastructure/pipes/parent-boards.pipe';
// import { FirstwordPipe } from './../infrastructure/pipes/firstword.pipe';


import { UserTypePipe } from '../infrastructure/pipes/user-type.pipe';
import { FilterUsersPipe } from '../infrastructure/pipes/filter-users.pipe';
import { SortUsersPipe } from '../infrastructure/pipes/sort-users.pipe';
import { AppPipesModule } from '../app-pipes/app-pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    HomeComponent,
    UsersComponent,
    TopicsComponent,
    HeaderComponent,
    BoardsComponent,
    ChannelsComponent,
    FormularyComponent,
    ShortenModPipe,
    ParentBoardsPipe,
    // FirstwordPipe
    UserTypePipe,
    FilterUsersPipe,
    SortUsersPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AppPipesModule,
    FormsModule,
    // HttpClientModule

    //* NGX Pagination
		NgxPaginationModule,
  ]
})
export class AdminModule { }
