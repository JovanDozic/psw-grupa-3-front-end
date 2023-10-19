import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogComment } from './model/blog-comment.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getComments(): Observable<PagedResults<BlogComment>>{
    return this.http.get<PagedResults<BlogComment>>(environment.apiHost + `tourist/blogComment/getAll`);
  }

  addBlogComment(blogComment: BlogComment): Observable<BlogComment> {
    return this.http.post<BlogComment>(environment.apiHost + 'tourist/blogComment', blogComment);
  }

  deleteComment(id: number): Observable<BlogComment> {
    return this.http.delete<BlogComment>(environment.apiHost + 'tourist/blogComment/' + id);
  }

  updateComment(comment: BlogComment): Observable<BlogComment> {
    return this.http.put<BlogComment>(environment.apiHost + 'tourist/blogComment/' + comment.id, comment);
  }
}
