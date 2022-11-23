import { SafePipe } from './../infrastructure/pipes/safe.pipe';
import { SearchPipe } from './../infrastructure/pipes/search.pipe';
import { SearchFilterPipe } from './../infrastructure/pipes/search-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SearchFilterPipe,
    SearchPipe,
    SafePipe],
  exports: [
    SearchFilterPipe,
    SearchPipe, 
    SafePipe],
  imports: [
    CommonModule
  ]
})
export class AppPipesModule { }
