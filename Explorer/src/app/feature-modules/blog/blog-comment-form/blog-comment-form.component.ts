import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { BlogComment } from '../model/blog-comment.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-blog-comment-form',
  templateUrl: './blog-comment-form.component.html',
  styleUrls: ['./blog-comment-form.component.css']
})
export class BlogCommentFormComponent {

  @Output() commentsUpdated = new EventEmitter<null>();
  @Input() comment: BlogComment;
  @Input() shouldEdit: boolean = false;

  user: User | undefined;
  constructor(private service: BlogService, private authService: AuthService){}


  ngOnChanges(): void {
    this.blogCommentForm.reset();
    if(this.shouldEdit) {
      this.blogCommentForm.patchValue(this.comment);
    }
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  blogCommentForm = new FormGroup({
    blogId: new FormControl(0, [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

  addBlogComment() : void{
    console.log(this.blogCommentForm.value)

    const blogComment: BlogComment = {
      blogId: this.blogCommentForm.value.blogId || 1,
      comment: this.blogCommentForm.value.comment || '',
      userId: this.user?.id || -1,
      timeCreated: new Date(),
      timeUpdated: new Date()
    }

    this.service.addBlogComment(blogComment).subscribe({
      next:(_) => {
        this.commentsUpdated.emit()
      }
    });

  }

  updateComment(): void {
    const comment: BlogComment = {
      blogId: this.blogCommentForm.value.blogId || 1,
      comment: this.blogCommentForm.value.comment || "",
      userId: this.user?.id || -1,
      timeCreated: this.comment.timeCreated,
      timeUpdated: new Date()
    };
    comment.id = this.comment.id;
    this.service.updateComment(comment).subscribe({
      next: () => { this.commentsUpdated.emit();}
    });
  }
}
