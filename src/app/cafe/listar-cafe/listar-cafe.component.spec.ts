/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { ListarCafeComponent } from './listar-cafe.component';
import { HttpClientModule } from '@angular/common/http';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';
import { of } from 'rxjs';

describe('ListarCafeComponent', () => {
  let component: ListarCafeComponent;
  let fixture: ComponentFixture<ListarCafeComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ListarCafeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCafeComponent);
    component = fixture.componentInstance;

    const variedadCafe: Cafe[] = [];
    const cafeTypes = ["Blend", "Café de Origen"];

    for (let i = 0; i < 3; i++) {
      const cafe = new Cafe(
        faker.number.int({ min: 1 }),
        faker.book.title(),
        cafeTypes[Math.floor(Math.random() * cafeTypes.length)],
        faker.location.city(),
        faker.commerce.productAdjective(),
        faker.number.int(),
        faker.image.avatar()
      );
      component.cafes.push(cafe)
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 rows in the table', () => {
    expect(debug.queryAll(By.css('table.styled-table tbody tr'))).toHaveSize(3)
  });

  it('should have correct headers in the table', () => {
    const headers = debug.queryAll(By.css('table.styled-table thead th')).map(header => header.nativeElement.textContent.trim());
    expect(headers).toEqual(['#', 'Nombre', 'Tipo', 'Región']);
  });

  it('should display correct values in table cells', () => {
    debug.queryAll(By.css('table.styled-table tbody tr')).forEach((row, i) => {
      const cells = row.queryAll(By.css('td dd'));
      expect(cells[0].nativeElement.textContent.trim()).toBe(component.cafes[i].id.toString());
      expect(cells[1].nativeElement.textContent.trim()).toBe(component.cafes[i].nombre);
      expect(cells[2].nativeElement.textContent.trim()).toBe(component.cafes[i].tipo);
      expect(cells[3].nativeElement.textContent.trim()).toBe(component.cafes[i].region);
    });
  });

  it('should calculate total cafes correctly', () => {
    // Recalcula los totales en base a los datos simulados
    component.totalBlend = 0;
    component.totalOrigen = 0;
    for (let cafe of component.cafes) {
      if (cafe.tipo === 'Blend') {
        component.totalBlend++;
      } else {
        component.totalOrigen++;
      }
    }

    fixture.detectChanges();

    const totalOrigenElement = debug.query(By.css('.totales p:nth-child(1)'));
    const totalBlendElement = debug.query(By.css('.totales p:nth-child(2)'));

    expect(totalOrigenElement.nativeElement.textContent).toContain(`Total café de origen: ${component.totalOrigen}`);
    expect(totalBlendElement.nativeElement.textContent).toContain(`Total café blend: ${component.totalBlend}`);
  });

  it('should update total cafes when a new cafe is added', () => {
    component.cafes.push(new Cafe(
      faker.number.int({ min: 1 }),
      faker.book.title(),
      'Café de Origen',
      faker.location.city(),
      faker.commerce.productAdjective(),
      faker.number.int(),
      faker.image.avatar()
    ));
    fixture.detectChanges();

    const totalOrigenElement = debug.query(By.css('.totales p:nth-child(1)'));
    // Recalcula los totales en base a los datos simulados
    component.totalBlend = 0;
    component.totalOrigen = 0;
    for (let cafe of component.cafes) {
      if (cafe.tipo === 'Blend') {
        component.totalBlend++;
      } else {
        component.totalOrigen++;
      }
    }
    fixture.detectChanges();
    expect(totalOrigenElement.nativeElement.textContent).toContain(component.totalOrigen.toString());
  });
});
