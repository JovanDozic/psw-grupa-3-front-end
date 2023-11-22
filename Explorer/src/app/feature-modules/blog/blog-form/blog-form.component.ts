import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';


@Component({
  selector: 'xp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  imageUrls: string[] = [];
  imageUrl: string = '';
  user: User;


  constructor(private authService: AuthService, private service: BlogService) {}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  addImage(): void{
    this.imageUrls.push(this.imageUrl);
    console.log('Image added: ' + this.imageUrl);
    this.imageUrl = "";
  }
  
  addBlog(): void{
    if(this.blogForm.invalid){
      return;
    }
    const blog: Blog = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      images: this.imageUrls,
      creationDate: new Date(),
      userId: this.user.id,
      netVotes: 0,
      status: 1
    };
    console.log("Blog to add: ", blog);
    blog.creationDate.toISOString();

    this.service.addBlog(blog).subscribe({
        next: () => {console.log("New blog created")}
    });
  }
}
