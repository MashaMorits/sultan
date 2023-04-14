import { render, screen } from "@testing-library/react"
import Footer from "../components/Footer"
import '@testing-library/jest-dom'



test('проверка рендера', () => {
    render(<Footer />)
    const catalogEl = screen.getByText(/меню/i)
    expect(catalogEl).toBeInTheDocument()
})