import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { SearchResultTour } from '../model/search-result-tour.model';

@Component({
  selector: 'xp-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{

  tours: SearchResultTour[];
  starRating: number = 5;

  constructor(private route: ActivatedRoute, private marketplaceService: MarketplaceService) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    const longitudeValue = queryParams['longitude'];
    const latitudeValue = queryParams['latitude'];
    const distanceValue = queryParams['distance'];
    this.getSearchResults(longitudeValue, latitudeValue, distanceValue);    
  }

  getSearchResults(longitude: number, latitude: number, distance: number){
    this.tours = [
      // Your search results go here, e.g., objects representing search results
      { name: 'Result 1', description: 'Description 1', price: 55.23 },
      { name: 'Result 2', description: 'Description 2', price: 69.57 },
      { name: 'Result 3', description: 'Description 3', price: 25.12 },
      { name: 'Result 4', description: 'Description 4', price: 34.68 },
      { name: 'Result 5', description: 'Description 5', price: 43.93 },
      // Add more search results as needed
    ];


    // this.marketplaceService.getSearchResults(longitude, latitude, distance).subscribe({
    //   next: (results: SearchResultTour[]) => {
    //     this.tours = results;
    //   }
    // })
  }


}
