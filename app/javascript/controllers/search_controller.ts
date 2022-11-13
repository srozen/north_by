import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form", "input", "results"]
  resultsTarget: HTMLElement
  inputTarget: HTMLInputElement
  formTarget: HTMLFormElement

  submit(): void {
    this.formTarget.requestSubmit()
  }

  resetOnOutsideClick(event: Event): void {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.reset()
    }
  }

  reset(): void {
    this.resultsTarget.classList.add("hidden")
    this.resultsTarget.innerText = ""
    this.inputTarget.value = ""
  }
}
