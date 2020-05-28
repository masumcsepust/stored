import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormsComponent } from './movie-forms.component';

describe('MovieFormsComponent', () => {
  let component: MovieFormsComponent;
  let fixture: ComponentFixture<MovieFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
