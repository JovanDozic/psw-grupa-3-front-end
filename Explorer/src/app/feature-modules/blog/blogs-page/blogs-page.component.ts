import { Component, OnInit, Output } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../model/blog.model';
import { BlogStatus } from '../blog.status';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css']
})
export class BlogsPageComponent implements OnInit {

  blogs: Blog[] = [];
  selectedBlog: Blog;

  constructor(private service: BlogService){}
  
  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void{
    this.service.getBlogs().subscribe({
      next: (result: PagedResults<Blog>) => {
        this.blogs = result.results;
      },
      error: () => {
        console.log('Error! Could not get Blogs!');
      }
    })
  }

  filterBlogs(filter: BlogStatus): void{
      this.service.getFilteredBlogs(filter).subscribe({
        next: (result: Blog[]) => {
          this.blogs = result;
        },
        error: () => {
          console.log("Error! Could not filter blogs!");
        }
      })
  }
}
