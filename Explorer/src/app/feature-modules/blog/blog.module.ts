import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { BlogCommentFormComponent } from './blog-comment-form/blog-comment-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogCommentsComponent,
    BlogCommentFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    BlogCommentsComponent
  ]
})
export class BlogModule { }
