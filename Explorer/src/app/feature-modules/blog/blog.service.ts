import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addBlog(blog: Blog): Observable<Blog>{
    return this.http.post<Blog>("https://localhost:44333/api/blog", blog);
  }
}
