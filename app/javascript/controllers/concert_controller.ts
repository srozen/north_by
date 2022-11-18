import { Controller } from "@hotwired/stimulus"
export default class ConcertController extends Controller {
  static targets = ["tickets"]
  ticketsTarget: HTMLElement

  static values = { id: Number, soldOut: Boolean, ticketsRemaining: Number }
  soldOutValue: boolean
  ticketsRemainingValue: number

  ticketsRemainingValueChanged(): void {
    if (this.ticketsRemainingValue === 0) {
      this.ticketsTarget.innerText = "Sold Out"
    } else {
      const remaining = `${this.ticketsRemainingValue} Tickets Remaining`
      this.ticketsTarget.innerText = remaining
    }
  }
}
