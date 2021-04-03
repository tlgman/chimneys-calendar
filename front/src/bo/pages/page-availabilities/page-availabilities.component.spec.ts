import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAvailabilitiesComponent } from './page-availabilities.component';

describe('PageAvailabilitiesComponent', () => {
  let component: PageAvailabilitiesComponent;
  let fixture: ComponentFixture<PageAvailabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAvailabilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAvailabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
