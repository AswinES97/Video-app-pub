import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildcardComponent } from './wildcard.component';

describe('WildcardComponent', () => {
  let component: WildcardComponent;
  let fixture: ComponentFixture<WildcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WildcardComponent]
    });
    fixture = TestBed.createComponent(WildcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
