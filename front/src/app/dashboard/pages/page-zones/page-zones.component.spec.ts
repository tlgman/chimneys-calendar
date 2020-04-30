import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageZonesComponent } from './page-zones.component';

describe('PageZonesComponent', () => {
  let component: PageZonesComponent;
  let fixture: ComponentFixture<PageZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
