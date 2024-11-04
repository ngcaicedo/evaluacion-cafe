import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCafeComponent } from './listar-cafe/listar-cafe.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:  [ListarCafeComponent],
  declarations: [ListarCafeComponent]
})
export class CafeModule { }
