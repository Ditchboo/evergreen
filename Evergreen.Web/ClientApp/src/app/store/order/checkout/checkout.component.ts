import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {loadStripe} from '@stripe/stripe-js';
import {environment} from '../../../../environments/environment';
import {MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasketService} from "../../../services/basket.service";
import {OrderService} from "../../../services/order.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private stripe;
  loading = false;
  orderComplete = false;
  startDate;
  maxDate;
  availableCollectionTimes: any[] = [];
  card;
  cardErrors;
  orderId;
  @ViewChild('cardElement') cardElement: ElementRef;
  @ViewChild('paymentWizard') paymentWizard: MatStepper;

  personalDetails: FormGroup;
  collectionDetails: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private basketService: BasketService) { }

  ngOnInit(): void {
    this.startDate = moment().add(1, 'd');
    this.maxDate = moment().add(14, 'd');

    const startTime = moment().hour(9).minute(0);

    do {
      this.availableCollectionTimes.push({
        value: startTime.format('H:mm'),
        displayValue: startTime.format('H:mm A')
      });

      startTime.add(30, 'minutes');

    } while (startTime.hour() !== 17);

    loadStripe(environment.stripeKey)
      .then((x) => {
        this.stripe = x;
        this.initStripe();
      })
      .catch(err => {
        // handle this;
        console.log(err);
      });

    this.personalDetails = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
      emailAddress: ['', [Validators.email, Validators.required]]
    });

    this.collectionDetails = this.formBuilder.group({
      collectionDate: ['', [Validators.required]],
      collectionTime: ['', [Validators.required]]
    });
  }

  private initStripe() {
    this.loading = true;

    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({error}) => {
      this.cardErrors = error && error.message ? error.message : '';
    });

    this.card.addEventListener('ready', () => {
      this.loading = false;
    });
  }

  handlePayment() {
    this.loading = true;

    let collectionDate =  moment(this.collectionDetails.get('collectionDate').value);
    let collectionTime = this.collectionDetails.get('collectionTime').value;

    collectionDate.hours(collectionTime.split(':')[0]);
    collectionDate.minutes(collectionTime.split(':')[1]);

    this.orderService.createOrder({
      products: this.basketService.getLines(),
      collectionSlot: collectionDate,
      customer: {
        firstName: this.personalDetails.get('firstName').value,
        lastName: this.personalDetails.get('lastName').value,
        emailAddress: this.personalDetails.get('emailAddress').value
      }
    }).subscribe(x => {
      this.orderId = x;
      this.loading = false;
      this.paymentWizard.next();
      this.orderComplete = true;
    }, (err) => {
      this.loading = false;
      this.cardErrors = 'Sorry something went wrong, please try again.';
    });
  }

}
