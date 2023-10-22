import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';


@Component({
  selector: 'xp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent {

  constructor(private service: BlogService) {}

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  imageUrls: string[] = [];
  imageUrl: string = '';

  addImage(): void{
    this.imageUrls.push(this.imageUrl);
    console.log('Image added: ' + this.imageUrl);
    this.imageUrl = "";
  }
  
  addBlog(): void{
    const blog: Blog = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      images: this.imageUrls,
      creationDate: new Date()
    };
    console.log("Blog to add: ", blog);
    blog.creationDate.toISOString();

    this.service.addBlog(blog).subscribe({
        next: () => {console.log("New blog created")}
    });
  }
}
