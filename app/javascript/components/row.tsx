import * as React from "react"
import Seat from "./seat"

interface RowProps {
  rowNumber: number
  seatsPerRow: number
  ticketsToBuyCount: number
}

const Row = (props: RowProps): React.ReactElement => {
  const [seatStatuses, setSeatStatuses] = React.useState(
    Array.from(Array(props.seatsPerRow).keys()).map(() => "unsold")
  )

  const isSeatValid = (seatNumber: number): boolean => {
    if (seatNumber + props.ticketsToBuyCount > props.seatsPerRow) {
      return false
    }

    for (let i = 1; i < props.ticketsToBuyCount; i++) {
      if (seatStatuses[seatNumber + i] === "held") {
        return false
      }
    }

    return true
  }

  const validSeatStatus = (seatNumber: number): string => {
    if (seatStatuses[seatNumber] === "held") {
      return "held"
    } else {
      return isSeatValid(seatNumber) ? "unsold" : "invalid"
    }
  }

  const newState = (oldStatus: string): string => {
    if (oldStatus === "unsold") {
      return "held"
    } else if (oldStatus === "held") {
      return "unsold"
    } else {
      return "invalid"
    }
  }

  const onSeatChange = (seatNumber: number): void => {
    if (validSeatStatus(seatNumber) === "invalid") {
      return
    }

    setSeatStatuses(
      seatStatuses.map((status, index) => {
        if (
          index >= seatNumber &&
          index < seatNumber + props.ticketsToBuyCount
        ) {
          return newState(seatStatuses[seatNumber])
        } else {
          return status
        }
      })
    )
  }

  const seatItems = Array.from(Array(props.seatsPerRow).keys()).map(
    (seatNumber) => {
      return (
        <Seat
          key={seatNumber}
          seatNumber={seatNumber}
          status={validSeatStatus(seatNumber)}
          clickHandler={onSeatChange}
        />
      )
    }
  )

  return <tr className="h-20">{seatItems}</tr>
}

export default Row
