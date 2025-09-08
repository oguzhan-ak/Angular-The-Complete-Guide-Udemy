import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>([]);
  isFetching = signal(false);
  error = signal('');

  private placesService = inject(PlacesService);

  ngOnInit(): void {
    this.isFetching.set(true);
    this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places.set(places);
      },
      error: (error: Error) => {
        this.error.set(error.message || 'An unknown error occurred!');
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }

  onSelectPlace(place: Place) {
    this.placesService.addPlaceToUserPlaces(place).subscribe({
      next: (userPlaces) => {
        console.log('User places updated:', userPlaces);
      },
      error: (error: Error) => {
        console.error('Error updating user places:', error);
      },
    });
  }
}
