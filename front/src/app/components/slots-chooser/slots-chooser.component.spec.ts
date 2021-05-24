import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsChooserComponent } from './slots-chooser.component';

describe('SlotsChooserComponent', () => {
  let component: SlotsChooserComponent;
  let fixture: ComponentFixture<SlotsChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
