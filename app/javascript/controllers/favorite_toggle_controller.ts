import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="favorite-toggle"
export default class FavoriteToggleController extends Controller {
  static targets = ["elementToHide", "hideButton"]
  elementToHideTarget: HTMLElement
  hideButtonTarget: HTMLElement

  static values = { visible: Boolean }
  visibleValue: boolean

  connect(): void {
    this.updateHiddenClass()
    this.updateText()
  }

  toggle(): void {
    this.toggleState()
    this.updateHiddenClass()
    this.updateText()
  }

  updateHiddenClass(): void {
    this.elementToHideTarget.classList.toggle("hidden", !this.visibleValue)
  }

  toggleState(): void {
    this.visibleValue = !this.visibleValue
  }

  visibleText(): string {
    return this.visibleValue ? "Hide" : "Show"
  }

  updateText(): void {
    this.hideButtonTarget.innerText = this.visibleText()
  }
}
