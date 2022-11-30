import { ParentImagePipe } from './../infrastructure/pipes/parent-image.pipe';
import { RemoveStringPipe } from './../infrastructure/pipes/remove-string.pipe';
import { TimeAgoPipe } from './../infrastructure/pipes/time-ago.pipe';
import { ToDatePipe } from './../infrastructure/pipes/to-date.pipe';
import { SafePipe } from './../infrastructure/pipes/safe.pipe';
import { SearchPipe } from './../infrastructure/pipes/search.pipe';
import { SearchFilterPipe } from './../infrastructure/pipes/search-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentNamePipe } from '../infrastructure/pipes/parent-name.pipe';
import { ParentCommentPipe } from '../infrastructure/pipes/parent-comment.pipe';

@NgModule({
  declarations: [
    SearchFilterPipe,
    SearchPipe,
    SafePipe,
    ToDatePipe,
    TimeAgoPipe,
    RemoveStringPipe,
    ParentNamePipe,
    ParentImagePipe,
    ParentCommentPipe,],
  exports: [
    SearchFilterPipe,
    SearchPipe, 
    SafePipe,
    ToDatePipe,
    TimeAgoPipe,
    RemoveStringPipe,
    ParentNamePipe,
    ParentImagePipe,
    ParentCommentPipe,],
  imports: [
    CommonModule
  ]
})
export class AppPipesModule { }
