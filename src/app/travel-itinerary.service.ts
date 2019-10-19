import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TravelItinerary } from 'src/app/travel-itinerary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelItineraryService {

  constructor(private firestore: AngularFirestore) { }

  getTravelItinerary() {
    return this.firestore.collection('TravelItinerary').snapshotChanges();
  }

  getOneTravelItinerary(id) {
    return this.firestore.collection('TravelItinerary').doc(id).snapshotChanges();
  }

  createTravelItinerary(data: any) {
    return this.firestore.collection('TravelItinerary').add(data);
  }

  updateTravelItinerary(id, value) {
    console.log(value);
    this.firestore.doc(`TravelItinerary/${id}`).update(value);
  }

  deleteTravelItinerary(id) {
    this.firestore.doc(`TravelItinerary/${id}`).delete();
  }

}
