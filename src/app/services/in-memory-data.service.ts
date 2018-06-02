import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class InMemoryDataService {
  createDb() {
    const heroes = {
      items: [
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' }
      ]
    };
    return of({ heroes }).pipe(delay(10));
  }
}
