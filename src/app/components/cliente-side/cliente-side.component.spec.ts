import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSideComponent } from './cliente-side.component';

describe('ClienteSideComponent', () => {
  let component: ClienteSideComponent;
  let fixture: ComponentFixture<ClienteSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
