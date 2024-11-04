import { Component, OnInit } from '@angular/core';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

@Component({
  selector: 'app-listar-cafe',
  templateUrl: './listar-cafe.component.html',
  styleUrls: ['./listar-cafe.component.css']
})
export class ListarCafeComponent implements OnInit {

  cafes: Cafe[] = [];
  totalBlend: number = 0;
  totalOrigen: number = 0;

  constructor(private cafeService: CafeService) { }

  getVariedadCafe(): void {
    this.cafeService.getVariedadCafe().subscribe((cafes) => {
      this.cafes = cafes;

       // Reiniciar los totales antes de recalcular
      this.totalBlend = 0;
      this.totalOrigen = 0;

      for (let cafe of cafes){
        if(cafe.tipo === 'Blend'){
          this.totalBlend++;
        }
        else{
          this.totalOrigen++;
        }
      }
    });
  }

  ngOnInit() {
    this.getVariedadCafe();
  }

}
