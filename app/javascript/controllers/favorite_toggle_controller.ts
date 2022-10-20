import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="favorite-toggle"
export default class FavoriteToggleController extends Controller {
  static classes = ["hidden"]
  hiddenClass: string

  static targets = ["elementToHide", "hideButton"]
  elementToHideTarget: HTMLElement
  hideButtonTarget: HTMLElement

  static values = { visible: Boolean }
  visibleValue: boolean

  visibleValueChanged(): void {
    this.updateHiddenClass()
    this.updateText()
  }

  toggle(): void {
    this.visibleValue = !this.visibleValue
  }

  updateHiddenClass(): void {
    this.elementToHideTarget.classList.toggle(
      this.hiddenClass,
      !this.visibleValue
    )
  }

  visibleText(): string {
    return this.visibleValue ? "Hide" : "Show"
  }

  updateText(): void {
    this.hideButtonTarget.innerText = this.visibleText()
  }
}
