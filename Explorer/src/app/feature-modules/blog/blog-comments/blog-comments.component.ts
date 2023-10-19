import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogComment } from '../model/blog-comment.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';


@Component({
  selector: 'xp-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.css']
})
export class BlogCommentsComponent implements OnInit {

  comment: BlogComment[] = [];
  selectedComment: BlogComment;
  shouldRenderCommentForm: boolean = false;
  shouldEdit: boolean = false;

  user: User | undefined;

  constructor(private service: BlogService, private authService: AuthService){}

  ngOnInit(): void{
    this.getComments()
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  getComments(): void {
    this.service.getComments().subscribe({
      next: (result: PagedResults<BlogComment>) => {
        this.comment=result.results;
      },
      error: ( err: any) => {
        console.log(err);
      }
    })
    
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderCommentForm = true;
  }

  onEditClicked(comment: BlogComment): void {
    this.selectedComment = comment;
    this.shouldRenderCommentForm = true;
    this.shouldEdit = true;
  }

  deleteComment(id: number): void {
    this.service.deleteComment(id).subscribe({
      next: () => {
        this.getComments();
      },
    })
  }
}
