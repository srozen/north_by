import * as React from "react"
import Row from "./row"

interface VenueProps {
  rows: number
  seatsPerRow: number
}

const Venue = (props: VenueProps): React.ReactElement => {
  const rowNumbers = Array.from(Array(props.seatsPerRow).keys())
  const rowItems = rowNumbers.map((rowNumber) => {
    return (
      <Row
        rowNumber={rowNumber}
        seatsPerRow={props.seatsPerRow}
        key={rowNumber}
      />
    )
  })

  return (
    <table className="table">
      <tbody>{rowItems}</tbody>
    </table>
  )
}

export default Venue
