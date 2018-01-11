import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoDetailComponent } from './grupo-detail.component';

describe('GrupoDetailComponent', () => {
  let component: GrupoDetailComponent;
  let fixture: ComponentFixture<GrupoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
