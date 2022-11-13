import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form", "input", "results"]
  resultsTarget: HTMLElement
  inputTarget: HTMLInputElement
  formTarget: HTMLFormElement

  basicSubmit(): void {
    if (this.inputTarget.value === "") {
      this.reset()
    } else {
      this.formTarget.requestSubmit()
    }
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

  submit = this.debounce(this.basicSubmit.bind(this))

  debounce(functionToDebounce: Function, wait = 300) {
    let timeoutId = null
    console.log('init')

    return (...args: any[]) => {
      console.log('ruun')
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        timeoutId = null
        functionToDebounce(...args)
      }, wait)
    }
  }
}
