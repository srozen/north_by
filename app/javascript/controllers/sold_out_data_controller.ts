import { Controller } from "@hotwired/stimulus"
import { createConsumer, Subscription } from "@rails/actioncable"

// Connects to data-controller="sold-out-data"
export default class SoldOutDataController extends Controller {
  static targets = ["concert"]
  concertTargets: Array<HTMLElement>
  subscription: Subscription
  started: boolean

  connect(): void {
    if (this.subscription) {
      return
    } else {
      this.started = true
      this.subscription = this.createSubscription(this)
    }
  }

  createSubscription(source: SoldOutDataController): Subscription {
    return createConsumer().subscriptions.create("ScheduleChannel", {
      received({ sold_out_concert_ids }) {
        source.updateData(sold_out_concert_ids)
      },
    })
  }

  updateData(soldOutConcertIds: number[]): void {
    this.concertTargets.forEach((concertElement: HTMLElement) => {
      concertElement.dataset.concertSoldOutValue = soldOutConcertIds
        .includes(parseInt(concertElement.dataset.concertIdValue, 10))
        .toString()
    })
  }
}
