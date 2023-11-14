import { Component } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'xp-show-tour',
  templateUrl: './show-tour.component.html',
  styleUrls: ['./show-tour.component.css']
})
export class ShowTourComponent {
  tour: Tour = {
    name: 'Tura u planinama',
    description: 'Istraživanje prelepih planinskih predela.',
    difficult: 4,
    tags: 'Planinarenje, Priroda',
    status: 'Aktivna',
    price: 120.00,
    points: []
  };
}
