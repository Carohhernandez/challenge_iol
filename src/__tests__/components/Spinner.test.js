import { render, cleanup } from "@testing-library/react";
import Spinner from '../../components/Spinner';

afterEach(cleanup);

test("renders Spinner correctly", () => {
  const { asFragment } = render(<Spinner />);
  expect(asFragment()).toMatchSnapshot();
});