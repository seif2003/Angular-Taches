import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjesComponent } from './liste-projes.component';

describe('ListeProjesComponent', () => {
  let component: ListeProjesComponent;
  let fixture: ComponentFixture<ListeProjesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeProjesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
