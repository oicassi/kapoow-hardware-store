import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreSideComponent } from './sobre-side.component';

describe('SobreSideComponent', () => {
  let component: SobreSideComponent;
  let fixture: ComponentFixture<SobreSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
