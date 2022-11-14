import * as React from "react"
import { createRoot } from "react-dom/client"
import Venue from "./venue"

document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-element")
  if (container) {
    const root = createRoot(container)
    root.render(
      <Venue
        rowCount={parseInt(container.dataset.rowCount, 10)}
        seatsPerRow={parseInt(container.dataset.seatsPerRow, 10)}
        concertId={parseInt(container.dataset.concertId, 10)}
      />
    )
  }
})
