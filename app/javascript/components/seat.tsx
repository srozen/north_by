import * as React from "react"

interface SeatProps {
  seatNumber: number
  initialStatus: string
}

const Seat = (props: SeatProps): React.ReactElement => {
  const [status, setStatus] = React.useState(props.initialStatus)

  function isHeld(): boolean {
    return status === "held"
  }

  function changeState(): void {
    isHeld() ? setStatus("unsold") : setStatus("held")
  }

  function stateDisplayClass(): string {
    return isHeld() ? "bg-green-500" : "bg-white hover:bg-blue-300"
  }

  const cssClass = "p-4 m-2 border-black border-4 text-lg"

  return (
    <td>
      <span
        className={`${cssClass} ${stateDisplayClass()}`}
        onClick={changeState}>
        {props.seatNumber + 1}
      </span>
    </td>
  )
}

export default Seat
