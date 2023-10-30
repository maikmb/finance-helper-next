import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  it('renders page home with success', () => {
    render(<Home />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})