import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { PipeComponent } from '../three/pipe/pipe.component';
import { ConfigDataService } from './configData.service';
import { HttpModule } from '@angular/http';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule,],
      providers:[ConfigDataService, ],
      declarations: [ ConfigComponent, 
      IonRangeSliderComponent, PipeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
