import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BlogService } from '../blog.service';
import { BlogComment } from '../model/blog.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Blog } from '../model/blog.model';
import { BlogRating } from '../model/blog.model';
import { BlogStatus, convertBlogStatusToString } from '../model/blog.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xp-detailed-blog',
  templateUrl: './detailed-blog.component.html',
  styleUrls: ['./detailed-blog.component.css']
})
export class DetailedBlogComponent {

  @Output() commentsUpdated = new EventEmitter<null>();
  @Input() comment: BlogComment;

  user: User | undefined;
  loggedInUserId : number;
  editingComments: { [comment: string]: boolean } = {};

  blog: Blog;
  blogId: number;
  commentForm: FormGroup;
  addingComment: boolean = false;
  isClosed : boolean = false;
  blogImages: string[];
  currentImageIndex: number = 0;
  currentPicture: string = '';

  constructor(private service: BlogService, private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder){
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const blogIdParam = params.get('blogId');
      
      if (blogIdParam !== null) {
        this.blogId = +blogIdParam; // + konvertuje string u broj
        this.service.getBlog(this.blogId).subscribe(blog => {
          this.blog = blog;
          this.loadPictures(blog);
          if(this.blog.status == BlogStatus.CLOSED){
            this.isClosed = true;
          }
        });
  
        this.authService.user$.subscribe(user => {
          this.user = user;
          this.loggedInUserId = this.user.id;
        });

       
        if(this.blog.blogComments != null){
          this.blog.blogComments.forEach(comment => {
            this.editingComments[comment.comment] = false;
          });
        }
        
      } else {
        console.error('Nije pružen validan blogId.');
        this.service.getBlog(1).subscribe(blog => {
          this.blog = blog;
          this.blogId = 0;
        });
  
      }
    });
  }

  loadPictures(blog : Blog) {
    if(blog != null) {
      this.blogImages = blog.images;
      this.currentPicture = this.blogImages[this.currentImageIndex];
      
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.currentPicture = this.blogImages[this.currentImageIndex];
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.blogImages.length - 1) {
      this.currentImageIndex++;
      this.currentPicture = this.blogImages[this.currentImageIndex];
    }
  }


  addComment() {
    this.addingComment = true;
  }

  cancelComment() {
    this.commentForm.reset();
    this.addingComment = false;
  }

  leaveAComment() {
    if (this.commentForm.valid) {
      const newComment: BlogComment = {
        userId: this.loggedInUserId,
        blogId: this.blogId, 
        comment: this.commentForm.value.comment,
        timeCreated: new Date(),
        timeUpdated: new Date(),
      };

      this.service.leaveBlogComment(this.blogId, newComment).subscribe(() => {
        if (this.blog.blogComments != null) {
          this.blog.blogComments.push(newComment);
        }
        this.commentForm.reset();
        this.addingComment = false;
      });
    }
  }

  convertStatusToString(status: BlogStatus): string {
    return convertBlogStatusToString(status);
  }

  enableEditMode(index : number) {
    if(this.blog.blogComments != null){
      this.commentForm.patchValue({
        comment: this.blog.blogComments[index].comment
      });
      this.editingComments[index] = true;
    }
  }

  disableEditMode(index : number) {
    this.editingComments[index] = false;
    this.commentForm.reset();
  }

  deleteComment(comment : BlogComment) {
    if (this.blogId && comment) {
      this.service.deleteBlogComment(this.blogId, comment).subscribe(
        () => {
          console.log('Komentar je uspešno obrisan!');
          this.ngOnInit();
        },
        error => {
          console.error('Došlo je do greške prilikom brisanja komentara:', error);
        }
      );
    } else {
      console.warn('Nisu dostupni svi potrebni podaci za brisanje komentara.');
    }
  }

  updateComment(index : number) {
    if(this.blog.blogComments != null) {
      if (this.commentForm.valid) {
        const updatedComment = {
          ...this.blog.blogComments[index],
          comment: this.commentForm.value.comment,
          timeUpdated: new Date()
        };
        this.service.updateBlogComment(this.blogId, updatedComment).subscribe(() => {
          this.editingComments[index] = false;
          this.commentForm.reset();
          if(this.blog.blogComments!=null){
            this.blog.blogComments[index] = updatedComment;
          }
        });
      }
    }
  }

  rate(mark: number) {
    const rating: BlogRating = { userId: 1, votingDate: new Date(), mark };
    
    this.service.rateBlog(this.blogId, rating).subscribe(
      
      (response) => {
        console.log('Blog je ocenjen uspešno:', response);
        this.service.getBlog(this.blogId).subscribe(blog => {
          this.blog = blog;
          this.refreshColors();
        });
      },
      (error) => {
        console.error('Došlo je do greške pri ocenjivanju bloga:', error);
      }
    );
  }

  isUserRated(mark: number): boolean {
    if (this.blog.ratings) {
      return this.blog.ratings.some(rating => rating.userId === this.loggedInUserId && rating.mark === mark);
    }
    return false;
  }

  refreshColors() {
    const thumbUpButton = document.querySelector('.thumb-up-active') as HTMLElement;
    const thumbDownButton = document.querySelector('.thumb-down-active') as HTMLElement;

    thumbUpButton?.classList.remove('thumb-up-active');
    thumbDownButton?.classList.remove('thumb-down-active');

    if (this.isUserRated(1)) {
      thumbUpButton?.classList.add('thumb-up-active');
    }

    if (this.isUserRated(2)) {
      thumbDownButton?.classList.add('thumb-down-active');
    }
  }
  
}
