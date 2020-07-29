import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocaoMesComponent } from './promocao-mes.component';

describe('PromocaoMesComponent', () => {
  let component: PromocaoMesComponent;
  let fixture: ComponentFixture<PromocaoMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocaoMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocaoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
