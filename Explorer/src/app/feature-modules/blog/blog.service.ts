import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, BlogRating } from './model/blog.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogComment } from './model/blog.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addBlog(blog: Blog): Observable<Blog>{
    return this.http.post<Blog>(environment.apiHost + `blog`, blog);
  }

  getBlog(blogId: number): Observable<Blog>{
    return this.http.get<Blog>(environment.apiHost + `blog/get/` + blogId);
  }

    getBlogs(): Observable<PagedResults<Blog>>{
    return this.http.get<PagedResults<Blog>>(environment.apiHost + `blog/getAll`);
  }

  getComments(): Observable<PagedResults<BlogComment>>{
    return this.http.get<PagedResults<BlogComment>>(environment.apiHost + `tourist/blogComment/getAll`);
  }

  rateBlog(blogId: number, blogRating: BlogRating): Observable<Blog>{
    return this.http.post<Blog>(environment.apiHost + `blog/rate/` + blogId, blogRating);
  }

  updateBlogComment(blogId : number, blogComment : BlogComment) : Observable<Blog> {
    return this.http.put<Blog>(environment.apiHost + `blog/updateBlogComment/` + blogId, blogComment);
  }

  leaveBlogComment(blogId : number, blogComment : BlogComment) : Observable<Blog> {
    return this.http.post<Blog>(environment.apiHost + `blog/commentBlog/` + blogId, blogComment);
  }
  deleteBlogComment(blogId : number, _blogComment : BlogComment) : Observable<Blog> {
    return this.http.put<Blog>(environment.apiHost + `blog/deleteBlogComment/` + blogId, _blogComment);
  }
}
