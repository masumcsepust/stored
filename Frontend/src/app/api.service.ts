import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './models/Movie';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUrl='http://127.0.0.1:8000/';
  baseMovieUrl=`${this.baseUrl}api/movies/`;
  headers=new HttpHeaders({
    'Content-Type': 'application/json',
    //Authorization:'Token 90d9893ef83c6e7f6e7c1701b87193f2a081119c' static token
    // Authorization: `Token ${this.token}`                           Dynamic Token
  });

  constructor( private httpClient:HttpClient,
     private cookieService:CookieService) { }
  getMovies(){
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, {headers: this.getAuthHeader()});    
  }
  getMovie(id){
    return this.httpClient.get(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthHeader()});    
  }
  createMovie(title: string,description: string){
    const body=JSON.stringify({title, description});
    return this.httpClient.post(`${this.baseMovieUrl}`,body, {headers: this.getAuthHeader()});    
  }
  updateMovie(id:number,title: string,description: string){
    const body=JSON.stringify({id,title, description});
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`,body, {headers: this.getAuthHeader()});    
  }
  deleteMovie(id:number){
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthHeader()});    
  }
  rateMovie(rate:number,movieId:number){
    const body=JSON.stringify({stars: rate});

    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`,body, {headers: this.getAuthHeader()});  
    
  }
  loginUser(authData)
  {
    const body=JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`,body, {headers: this.headers});    
  }
  registerUser(authData)
  {
    const body=JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`,body, {headers: this.headers});    
  }
  getAuthHeader(){
    const token=this.cookieService.get('mr-token');
  return new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization:'Token 90d9893ef83c6e7f6e7c1701b87193f2a081119c' static token
      Authorization: `Token ${token}`                           //Dynamic Token
    });
  }
}
