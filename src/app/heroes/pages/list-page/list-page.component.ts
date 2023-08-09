import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public heroes :Hero[] =[]

  constructor(private heroService:HeroesService){

  }
  //recordar que cuando se realiza se suscribe a un servicio es por que va a estar
  //a la escucha de lo que suceda al evento al cual se esta suscribiendo
  //en este caso al evento del servicio solicitado
  ngOnInit(): void {
   this.heroService.getHeroes()
   .subscribe(heroes => this.heroes = heroes)
   
   console.log(this.heroes);
  }


}
