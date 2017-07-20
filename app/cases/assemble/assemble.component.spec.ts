import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AssembleComponent } from './assemble.component';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { JobDataService } from './jobData.service';
import { HttpModule } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('AssembleComponent', () => {
  let component: AssembleComponent;
  let fixture: ComponentFixture<AssembleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule,],
      providers:[JobDataService, ],
      declarations: [ AssembleComponent, 
      IonRangeSliderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
