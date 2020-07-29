import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFinalizaComponent } from './card-finaliza.component';

describe('CardFinalizaComponent', () => {
  let component: CardFinalizaComponent;
  let fixture: ComponentFixture<CardFinalizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFinalizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFinalizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
