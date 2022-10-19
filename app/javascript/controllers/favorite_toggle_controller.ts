import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="favorite-toggle"
export default class FavoriteToggleController extends Controller {
  static targets = ["elementToHide"]
  elementToHideTarget: HTMLElement
  connect(): void {
    console.log("The controller is connected")
  }

  toggle(): void {
    this.elementToHideTarget.classList.toggle("hidden")
  }
}
