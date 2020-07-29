import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoSideComponent } from './contato-side.component';

describe('ContatoSideComponent', () => {
  let component: ContatoSideComponent;
  let fixture: ComponentFixture<ContatoSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
