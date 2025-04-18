import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCreateComponent } from './listing-create.component';

describe('ListingCreateComponent', () => {
  let component: ListingCreateComponent;
  let fixture: ComponentFixture<ListingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
