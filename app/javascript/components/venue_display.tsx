import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-element")
  if (container) {
    const root = createRoot(container)
    root.render(
      <App
        rowCount={parseInt(container.dataset.rowCount, 10)}
        seatsPerRow={parseInt(container.dataset.seatsPerRow, 10)}
        concertId={parseInt(container.dataset.concertId, 10)}
      />
    )
  }
})
