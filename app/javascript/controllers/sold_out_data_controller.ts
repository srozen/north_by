import { Controller } from "@hotwired/stimulus"
import { createConsumer, Subscription } from "@rails/actioncable"

// Connects to data-controller="sold-out-data"
interface ConcertRemainingData {
  concertId: number
  ticketsRemaining: number
}

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
      received({ concerts }) {
        source.updateData(concerts)
      },
    })
  }

  updateData(concerts: ConcertRemainingData[]): void {
    concerts.forEach(({ concertId, ticketsRemaining }) => {
      this.concertTargets.forEach((e) => {
        if (e.dataset.concertIdValue === concertId.toString()) {
          e.dataset.concertTicketsRemainingValue =
            ticketsRemaining.toString()
          e.dataset.concertSoldOutValue = (
            ticketsRemaining === 0
          ).toString()
        }
      })
    })
  }
}
