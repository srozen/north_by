import * as React from "react"
import { createRoot } from "react-dom/client"
import Venue from "./venue"

document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-element")
  if (container) {
    const root = createRoot(container)
    root.render(<Venue rows={10} seatsPerRow={10} />)
  }
})
