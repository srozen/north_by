import * as React from "react"
import Seat from "./seat"
import { RowData, TicketData } from "./venue"
import seat from "./seat"
import { Subscription } from "@rails/actioncable"

interface RowProps {
  concertId: number
  rowData: RowData
  subscription: Subscription
  rowNumber: number
  seatsPerRow: number
  ticketsToBuyCount: number
}

const Row = (props: RowProps): React.ReactElement => {
  const [seatStatuses, setSeatStatuses] = React.useState(
    Array.from(Array(props.seatsPerRow).keys()).map(() => "unsold")
  )

  React.useEffect(() => {
    if (props.rowData) {
      setSeatStatuses(
        props.rowData.map((ticketData: TicketData) => ticketData.status)
      )
    }
  }, [props.rowData])

  const isSeatValid = (seatNumber: number): boolean => {
    if (seatNumber + props.ticketsToBuyCount > props.seatsPerRow) {
      return false
    }

    for (let i = 1; i < props.ticketsToBuyCount; i++) {
      const seatStatus = seatStatuses[seatNumber + i]
      if (seatStatus === "held" || seatStatus === "purchased") {
        return false
      }
    }

    return true
  }

  const validSeatStatus = (seatNumber: number): string => {
    const seatStatus = seatStatuses[seatNumber]
    if (seatStatus === "held" || seatStatus === "purchased") {
      return seatStatus
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

  const updateSeatStatus = (seatNumber: number): string[] => {
    return seatStatuses.map((status, index) => {
      if (
        index >= seatNumber &&
        index < seatNumber + props.ticketsToBuyCount
      ) {
        return newState(seatStatuses[seatNumber])
      } else {
        return status
      }
    })
  }

  const csrfToken = (): string => {
    return document
      .querySelector("[name='csrf-token']")
      ?.getAttribute("content")
  }

  const onSeatChange = (seatNumber: number): void => {
    const validStatus = validSeatStatus(seatNumber)
    if (validStatus === "invalid" || validStatus === "purchased") {
      return
    }
    const newSeatStatuses = updateSeatStatus(seatNumber)
    setSeatStatuses(newSeatStatuses)
    props.subscription.perform("added_to_cart", {
      concertId: props.concertId,
      row: props.rowNumber + 1,
      seatNumber: seatNumber + 1,
      status: newSeatStatuses[seatNumber],
      ticketsToBuyCount: props.ticketsToBuyCount,
    })
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
