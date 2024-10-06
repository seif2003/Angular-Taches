import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParProjetComponent } from './recherche-par-projet.component';

describe('RechercheParProjetComponent', () => {
  let component: RechercheParProjetComponent;
  let fixture: ComponentFixture<RechercheParProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechercheParProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
