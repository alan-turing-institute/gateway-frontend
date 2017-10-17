import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { PipeModule} from '../components/pipe/pipe.module';

import { DescriptionModule } from '../components/description/description.module';
import { InputModule } from '../components/input/input.module';
// import { TextComponent } from '../components/input/text/text.component';
// import { SliderComponent } from '../components/input/slider/slider.component';
import { ConfigDataService } from './configData.service';

import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  const routes: Routes = [
  {
    path: 'config',
    component: ConfigComponent,
    data: {
      title: 'Config'
    }
  }
] ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ConfigRoutingModule,
        CommonModule,
        FormsModule,
        DescriptionModule,
        PipeModule,InputModule],
      providers:[ConfigDataService, ],
      declarations: [ ConfigComponent, 
        , PipeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
