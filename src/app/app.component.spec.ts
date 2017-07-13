import { TestBed, async } from '@angular/core/testing';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ParametersComponent } from './parameters/parameters.component';
import { AssembleComponent } from './assemble/assemble.component';
import { BannerComponent } from './banner/banner.component';
import { FeedbackComponent } from './feedback/feedback.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ParametersComponent,
        AssembleComponent,
        BannerComponent,
        FeedbackComponent
      ],
      imports: [HttpModule],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Code Blue'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Code Blue');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Mockup a banner');
  // }));
});
