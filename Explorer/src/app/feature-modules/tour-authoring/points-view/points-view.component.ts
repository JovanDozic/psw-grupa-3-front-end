import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { Point } from '../model/points.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../model/tour.model';

@Component({
  selector: 'xp-points-view',
  templateUrl: './points-view.component.html',
  styleUrls: ['./points-view.component.css']
})
export class PointsViewComponent implements OnInit {
  points: Point[] = [];
  selectedPoints: Point[] = [];
  tours: Tour[]=[];
  containsUnselectedPoints = true;

  constructor(private service: TourAuthoringService) {}

  ngOnInit(): void {
    this.getPoints();
  }


    getPoints(): void {
        this.service.getAllPublicPointsForTours().subscribe((data: Point[]) => {
          this.points = data;
         
        });
      }
   

      onSelect(point: Point): void {
        const index = this.selectedPoints.indexOf(point);
        if (index >= 0) {
          this.selectedPoints.splice(index, 1); 
        } else {
          this.selectedPoints.push(point); 
        }
      }

      findTours(): void {
        if (this.selectedPoints.length < 2) {
             alert('List must contain at least 2 points.');
          }
        this.service.findToursContainingPoints(this.selectedPoints).subscribe((data: Tour[]) => {
          this.tours = data;
          
    
          
        });
      }

      checkForUnselectedPoints(tour: Tour): boolean {
        const tourPoints = tour.points.map((point: Point) => point.name); // Promenite "name" ako je to jedinstveni identifikator
        const selectedPoints = this.selectedPoints.map((point: Point) => point.name); // Takođe promenite ovde
    
        // Ukoliko ne možete koristiti isto polje za identifikaciju, možete pokušati kombinovati različita polja
        // const tourPoints = tour.points.map((point: Point) => `${point.latitude}-${point.longitude}`);
        // const selectedPoints = this.selectedPoints.map((point: Point) => `${point.latitude}-${point.longitude}`);
    
        return tourPoints.some(pointName => !selectedPoints.includes(pointName));
    }
      addMyTours(): void {
     
      }

      /*findTours(): void {
        if (this.selectedPoints.length < 2) {
          console.error('List must contain at least 2 points.');
          return;
        }
      
        this.service.findToursContainingPoints(this.selectedPoints).subscribe({
          next: (result: PagedResults<Tour>) => {
            this.tours = result.results;
            
          },
          error: (error) => {
            console.error('An error occurred:', error);
            
          }
        });
      }*/
  }

  
  


  
