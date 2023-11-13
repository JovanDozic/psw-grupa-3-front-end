import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailedBlogComponent } from './detailed-blog/detailed-blog.component';

@NgModule({
  declarations: [
    BlogFormComponent,
    DetailedBlogComponent
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
    DetailedBlogComponent
  ]
})
export class BlogModule { }
