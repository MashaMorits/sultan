import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import store  from '../store/index';
import '@testing-library/jest-dom'
import Product from "../pages/Product";
import { MemoryRouter } from "react-router-dom";


describe('тесты на странице товара', () => {
    
    test('тест счётчика', async () => {

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Product />
                </Provider>
            </MemoryRouter>
        )
        
        const increment = screen.getByTestId('increment')
        const decrement = screen.getByTestId('decrement')
        fireEvent.click(increment)
        expect(screen.getByTestId('counterValue')).toHaveTextContent('1')
        fireEvent.click(decrement)
        expect(screen.getByTestId('counterValue')).toHaveTextContent('2')
        fireEvent.click(increment)
        expect(screen.getByTestId('counterValue')).toHaveTextContent('1')
        fireEvent.click(increment)
        expect(screen.getByTestId('counterValue')).toHaveTextContent('1')
    }),

    test('тест открывания характеристик', () => {

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Product />
                </Provider>
            </MemoryRouter>
        )

        
        const toggleBtn = screen.getByTestId('toggleBtn')
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('toggleDescription')).toBeInTheDocument()
        fireEvent.click(toggleBtn)
        expect(screen.queryByTestId('toggleDescription')).toBeNull()
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('toggleDescription')).toBeInTheDocument()
    })
})