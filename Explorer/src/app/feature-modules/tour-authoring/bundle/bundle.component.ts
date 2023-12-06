import { Component, OnInit } from '@angular/core';
import { Bundle } from '../model/bundle.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit{
  
  public bundles: Bundle[]
  
  
  constructor(private service: TourAuthoringService) { }

  ngOnInit(): void {
    this.service.getAllBundles().subscribe({
      next: (result: PagedResults<Bundle>) => {
        this.bundles = result.results;
        console.log(result.results)
      },
      error: () => {
      }
    })
  }

  archive(id: number){
    this.service.archiveBundle(id).subscribe({
      next: () =>
        this.service.getAllBundles().subscribe({
          next: (result: PagedResults<Bundle>) => {
            this.bundles = result.results;
          },
          error: () => {
          }
        })
    });
  }
  
  publish(id: number){
    this.service.publishBundle(id).subscribe({
      next: () =>
        this.service.getAllBundles().subscribe({
          next: (result: PagedResults<Bundle>) => {
            this.bundles = result.results;
          },
          error: () => {
          }
        })
    });
  }

  delete(id: number){
    this.service.deleteBundle(id).subscribe({
      next: () =>
      this.service.getAllBundles().subscribe({
        next: (result: PagedResults<Bundle>) => {
          this.bundles = result.results;
        },
        error: () => {
        }
      })
    })
  }

}
