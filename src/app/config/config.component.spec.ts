import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { PipeComponent } from '../components/pipe/three/pipe/pipe.component';
import { ConfigDataService } from './configData.service';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
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
      imports: [FormsModule, HttpModule,TabsModule.forRoot(),RouterModule.forChild(routes)],
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

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
