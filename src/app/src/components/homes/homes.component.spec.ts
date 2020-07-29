import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HomesComponent } from './homes.component';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let service : DataService
  let dialogService : DialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports:[HttpClientModule,MatDialogModule],
      declarations: [ HomesComponent ],
      providers:[DataService,DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    
  });

  beforeEach(()=> {
    
    service = TestBed.get(DataService);
    dialogService = TestBed.get(DialogService);
    const homes = require('../../../../assets/homes.json');
    spyOn(service,'getHomes$').and.returnValue(of(homes));
    fixture.detectChanges();
  });
  it('should show homes', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
  });
  it('should show home info', () => {
     const home =  fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="title"]').innerText).toEqual("Home 1");
    expect(home.querySelector('[data-test="location"]').innerText).toEqual("new york");
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });
  it('should use dialog service to open a dialog when clicking book button', () => {
    const button =  fixture.nativeElement.querySelector('[data-test="home"] button');
    const spy =  spyOn(dialogService,'open').and.returnValue(null);
    button.click();
    expect(spy).toHaveBeenCalled();
   });
});
