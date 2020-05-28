import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service'
import { error } from 'util';
import {Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

   @Input() movie: Movie;
   @Output() updateDetails=new EventEmitter<Movie>();
   

   rateHovered=0;

   constructor( private apiService:ApiService) { }

  ngOnInit() {
  }
  rateHover(rate: number){
    this.rateHovered=rate;
  }
  rateClicked(rate: number)
  {
       this.apiService.rateMovie(rate,this.movie.id).subscribe(
       result => this.getDetails(),
       error =>
       console.error(error)
       );             
  }
  getDetails()
  {
       this.apiService.getMovie(this.movie.id).subscribe(
       (movie: Movie) => {
         this.updateDetails.emit(movie);
       },
       error =>
       console.error(error)
       );             
  }


}
