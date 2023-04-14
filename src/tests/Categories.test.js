import { fireEvent, render, screen } from "@testing-library/react"
import { Provider, useSelector, useDispatch } from "react-redux"
import store  from '../store/index';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import Filters from "../components/Filters";
import { useAppSelector } from "../hooks";
import Categories from "../components/Categories";
import * as reduxHooks from "react-redux";
import * as actions from '../store/productsSlice'




jest.mock('react-redux')
const MockedSelector = jest.spyOn(reduxHooks, 'useSelector')
const MockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')

describe('тесты категориц', () => {
    
    it('пустой список активных категорий', () => {
        // useSelector.mockReturnValue([])
        MockedSelector.mockReturnValue([])

        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <Categories />
                </Provider>
            </MemoryRouter>
        )
        expect(component).toMatchSnapshot()
    });

    it('непустой список активных категорий', () => {
        MockedSelector.mockReturnValue(['Уход за руками, Уход за телом'])

        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <Categories />
                </Provider>
            </MemoryRouter>
        )
        expect(component).toMatchSnapshot()
    });

})