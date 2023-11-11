import { Component, OnChanges, OnInit, Output } from '@angular/core';
import { Point } from '../../tour-authoring/model/points.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Position } from '../model/position.model';
import { TourExecutionService } from '../tour-execution.service';
import { TourExecution } from '../model/tour-lifecycle.model';
import { Tourr } from '../model/tourr.model';

@Component({
  selector: 'xp-tour-execution',
  templateUrl: './tour-execution.component.html',
  styleUrls: ['./tour-execution.component.css']
})
export class TourExecutionComponent implements OnInit {

  position: Position
  tourExecution: TourExecution
  updatedExecution: TourExecution
  points: Point[] = [{id: 1, longitude: 19.83966064452716 , latitude: 45.2517365956994,
    name:"prva", description:"nista", picture:"nista", tourId: 1},
    {id: 2, longitude: 19.84902279858312 , latitude: 45.24806268406058,
      name:"druga", description:"nista", picture:"nista", tourId: 1},
      {id: 3, longitude: 19.850053025386785 , latitude: 45.239239491988556,
        name:"treca", description:"nista", picture:"nista", tourId: 1}
  ]

  tour: Tourr = {id: 1,name: "Markova", description: "odlicna",
                  difficult: 2, tags:"nista", status:"draft", price: 3, points: this.points, authorId: 1}

  constructor(private service: TourExecutionService){

    
  }
  
  ngOnInit(): void {
        this.service.startExecution(this.tour).subscribe({
          next: (result: TourExecution) => {
            this.tourExecution = result
            console.log(result)
          }
        })
  }

    handleUpdatedPosition(updatedPosition: Position) {
      this.position = updatedPosition;
      /*
      this.service.updatePosition(this.tourExecution.id,this.position).subscribe({
          next: (result: TourExecution) => {
            this.updatedExecution = result
          }
      })
      */
    }
}
