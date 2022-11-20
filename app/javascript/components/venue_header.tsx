import * as React from "react"
import styled from "styled-components"
import { IsVenueContext, VenueContext } from "./app"

const Header = styled.span`
  font-size: 1/5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
`

interface VenueHeaderProps {
  seatsPerRow: number
  setTicketsToBuyCount: (n: number) => void
}

const options = (seatsPerRow: number) => {
  const arrayOfNumbers = Array.from(Array(seatsPerRow).keys())
  return arrayOfNumbers.map((i) => {
    const val = i + 1
    return (
      <option key={val} value={val}>
        {val}
      </option>
    )
  })
}

export const VenueHeader = (): React.ReactElement => {
  const context = React.useContext<IsVenueContext>(VenueContext)
  const setTicketsOnChange = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLSelectElement
    context.dispatch({
      type: "setTicketsToBuy",
      amount: parseInt(target.value, 10),
    })
  }

  return (
    <div>
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={setTicketsOnChange}>
          {options(context.state.seatsPerRow)}
        </select>
      </span>
    </div>
  )
}

export default VenueHeader
