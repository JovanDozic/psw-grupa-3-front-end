import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';
import { ProblemFormComponent } from 'src/app/feature-modules/tour-authoring/problem-form/problem-form.component';
import { ProblemsComponent } from 'src/app/feature-modules/administration/problems/problems.component';
import { OverviewComponent } from 'src/app/feature-modules/administration/admin/overview.component';
import { BlogFormComponent } from 'src/app/feature-modules/blog/blog-form/blog-form.component';
import {PointsComponent} from "../../feature-modules/tour-authoring/points/points.component";
import { PreferenceComponent } from 'src/app/feature-modules/marketplace/preference/preference.component';
import { TourReviewFormComponent } from 'src/app/feature-modules/tour-authoring/tour-review-form/tour-review-form.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { AppRatingsComponent } from 'src/app/feature-modules/administration/app-ratings/app-ratings.component';
import { AppRatingFormComponent } from 'src/app/feature-modules/administration/app-rating-form/app-rating-form.component';
import { BlogCommentsComponent } from 'src/app/feature-modules/blog/blog-comments/blog-comments.component';
import { EquipmentRecordComponent } from 'src/app/feature-modules/administration/equipment-record/equipment-record.component';
import { ClubInvitationFormComponent } from 'src/app/feature-modules/tour-authoring/club-invitation-form/club-invitation-form.component';
import { ClubInvitationsComponent } from 'src/app/feature-modules/tour-authoring/club-invitations/club-invitations.component';
import { ClubMembersComponent } from 'src/app/feature-modules/tour-authoring/club-members/club-members.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'problem-form', component: ProblemFormComponent},
  {path: 'problems', component: ProblemsComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'blogCreation', component: BlogFormComponent, canActivate: [AuthGuard]},
  {path: 'points', component: PointsComponent, canActivate: [AuthGuard]},
  {path: 'preference', component: PreferenceComponent},
  {path: 'tour-review', component: TourReviewFormComponent},
  {path: 'tours', component: TourComponent, canActivate: [AuthGuard]},
  {path: 'app-ratings', component: AppRatingsComponent},
  {path: 'app-rating-form', component: AppRatingFormComponent},
  {path: 'blog-comments', component: BlogCommentsComponent, canActivate: [AuthGuard]},
  {path: 'equipment-record', component: EquipmentRecordComponent},
  {path: 'invitations', component: ClubInvitationFormComponent},
  {path: 'club-invitations', component: ClubInvitationsComponent},
  {path: 'club-members', component: ClubMembersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
