import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-travel-itinerary',
  templateUrl: './edit-travel-itinerary.component.html',
  styleUrls: ['./edit-travel-itinerary.component.css']
})
export class EditTravelItineraryComponent implements OnInit {

  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';

  constructor(private router: Router, private route: ActivatedRoute,
  private ts: TravelItineraryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getTravelItinerary(this.route.snapshot.params['id']);
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required]
    });
  }

  getTravelItinerary(id) {
    this.ts.getOneTravelItinerary(id).subscribe(data => {
      const tmp: any = data.payload.data();
      // console.log(tmp);
      if (tmp) {
        this.id = data.payload.id;
        this.boardsForm.setValue({
          title: tmp.title,
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate()
        });
      }
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(this.id);
    this.ts.updateTravelItinerary(this.id, form);
    this.router.navigate(['/dashboard']);
  }

}
