import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeRdvComponent } from './take-rdv.component';

describe('TakeRdvComponent', () => {
  let component: TakeRdvComponent;
  let fixture: ComponentFixture<TakeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
