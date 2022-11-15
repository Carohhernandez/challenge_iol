import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

afterEach(cleanup);

test("renders Header correctly", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
