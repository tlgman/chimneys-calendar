import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvTakerComponent } from './rdv-taker.component';

describe('RdvTakerComponent', () => {
  let component: RdvTakerComponent;
  let fixture: ComponentFixture<RdvTakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvTakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
