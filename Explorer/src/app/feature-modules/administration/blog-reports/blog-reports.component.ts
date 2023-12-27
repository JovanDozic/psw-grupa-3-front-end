import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { BlogReport } from '../../blog/model/blog.model';

@Component({
  selector: 'xp-blog-reports',
  templateUrl: './blog-reports.component.html',
  styleUrls: ['./blog-reports.component.css']
})
export class BlogReportsComponent implements OnInit {

  unreviewedReports: BlogReport[] = [];
  selectedReport: BlogReport = {} as BlogReport;
  reportReasons: string[] = [
    "",
    "Spam",
    "Hate speech",
    "False information",
    "Bullying or harassment",
    "Violence or dangerous organizations"
  ];

  constructor(private AuthService: AuthService /* ! Dodati blog servis */) { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const report: BlogReport = {
        blogId: i,
        userId: i + 100,
        reportAuthorId: i + 200,
        timeCommentCreated: new Date(),
        timeReported: new Date(),
        reportReason: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        isReviewed: false,
        comment: "Comment " + i + " for blog " + i,
      };
      this.unreviewedReports.push(report);
    }
  }

  selectReport(report: BlogReport) {
    this.selectedReport = report;
  }

  acceptReport() {

  }

  denyReport() {
    
  }

}
