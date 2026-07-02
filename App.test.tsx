import { render, screen } from "@testing-library/react-native";

import { HomeScreen } from "modules/Home/screens/HomeScreen";

it("renders home screen", () => {
  render(<HomeScreen />);
  expect(screen.getByText("Perfil")).toBeTruthy();
  expect(screen.getByText("General")).toBeTruthy();
});
