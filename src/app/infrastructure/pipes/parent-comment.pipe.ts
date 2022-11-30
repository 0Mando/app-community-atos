import { ChannelService } from 'src/app/infrastructure/services/channel.service';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { map, Observable, Subscribable, switchMap } from 'rxjs';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentComment'
})
export class ParentCommentPipe implements PipeTransform {

  constructor(
    private _commentService: CommentsService,
    private _articleService: ArticleService,
    private _channelService: ChannelService){}

  transform(value: string): Observable<any> | Subscribable<any> | Promise<any> {
    return this._commentService.readComments().pipe(
      map(comments => {
        let returned;
        comments.forEach((comment: any) => {
          if(value === comment.payload.doc.id){
            returned = comment.payload.doc.data().idPost
          }
        })
        return returned
      }),
      switchMap(id => this._articleService.readPosts().pipe(
        map(data => {
          let name;
          data.forEach((element: any) => {
            if(element.payload.doc.id === id){
              name = element.payload.doc.data().channelId
            }
          });
          return name;
        }),
        switchMap(datax => this._channelService.readChannels().pipe(
          map(data => {
            let name;
            data.forEach(element => {
              if(element.payload.doc.id === datax){
                name = element.payload.doc.data().channelImage
              }
            });
            return name;
          })
        ))
      ))
    )
  }

}
