import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlogCommentFormComponent } from './blog-comment-form/blog-comment-form.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';

@NgModule({
  declarations: [
    BlogFormComponent,
    BlogCommentsComponent,
    BlogCommentFormComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    BlogFormComponent,
    BlogCommentsComponent
  ]
})
export class BlogModule { }
