import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xp-recommended-tours',
  templateUrl: './recommended-tours.component.html',
  styleUrls: ['./recommended-tours.component.css']
})
export class RecommendedToursComponent implements OnInit {
  starRating:number;
  starRatingNewYork:number;

  constructor(){
    this.starRating = 4.7
    this.starRatingNewYork = 5;
  }
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

}
