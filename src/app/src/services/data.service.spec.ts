import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { __values } from 'tslib';

describe('DataService', () => {

  let dataService: DataService;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {

    dataService = TestBed.get(DataService);
    httpClient = TestBed.get(HttpClient);

  });

  it('should return the list of homes',()=>{
      const mockData = [{
        "title": "Home 1",
        "image": "assets/listing.jpg",
        "location": "new york"
      },
      {
        "title": "Home 2",
        "image": "assets/listing.jpg",
        "location": "boston"
      },
      {
        "title": "Home 3",
        "image": "assets/listing.jpg",
        "location": "chicago"
      }];
    const spy = spyOn(httpClient,'get').and.returnValue(of(mockData));
    let result;
      const subscription = dataService.getHomes$().subscribe(value => {
        result = value;
      });
      subscription.unsubscribe();
      expect(spy).toHaveBeenCalledWith('assets/homes.json');
      expect(result).toEqual(mockData);

  });
  xit('should call API endpoind and return result', fakeAsync(() => {

    const spy = jasmine.createSpy('spy');

    /*const homes = require('../../../assets/homes.json');

    spyOn(httpClient, 'get').and.returnValue(of(homes));

    dataService.getHomes$().subscribe(spy);

    tick();

    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');
    expect(spy).toHaveBeenCalledWith(homes);*/

  }));
});