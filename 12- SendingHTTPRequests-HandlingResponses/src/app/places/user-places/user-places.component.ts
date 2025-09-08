import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    this.placesService.loadUserPlaces().subscribe({
      error: (error: Error) => {
        this.error.set(error.message || 'An unknown error occurred!');
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }

  onRemovePlace(place: Place) {
    this.placesService.removeUserPlace(place).subscribe();
  }
}
