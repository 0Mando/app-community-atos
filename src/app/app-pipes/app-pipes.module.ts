import { RemoveStringPipe } from './../infrastructure/pipes/remove-string.pipe';
import { TimeAgoPipe } from './../infrastructure/pipes/time-ago.pipe';
import { ToDatePipe } from './../infrastructure/pipes/to-date.pipe';
import { SafePipe } from './../infrastructure/pipes/safe.pipe';
import { SearchPipe } from './../infrastructure/pipes/search.pipe';
import { SearchFilterPipe } from './../infrastructure/pipes/search-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SearchFilterPipe,
    SearchPipe,
    SafePipe,
    ToDatePipe,
    TimeAgoPipe,
    RemoveStringPipe],
  exports: [
    SearchFilterPipe,
    SearchPipe, 
    SafePipe,
    ToDatePipe,
    TimeAgoPipe,
    RemoveStringPipe],
  imports: [
    CommonModule
  ]
})
export class AppPipesModule { }
