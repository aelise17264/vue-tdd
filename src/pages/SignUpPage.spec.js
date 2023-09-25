import SignUpPage from "./SignUpPage.vue";
import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("sign up page", () => {
  describe("layout", () => {
    it("has sign up header", () => {
      render(SignUpPage);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });
    it("has username input", () => {
      // const {container} =
      render(SignUpPage);
      const usernameInput = screen.queryByLabelText("Username");
      // const input = container.querySelector('input')
      expect(usernameInput).toBeInTheDocument();
    });
    it("has email input", () => {
      // const {container} =
      render(SignUpPage);
      // const inputCount = container.querySelectorAll('input').length
      const emailInput = screen.queryByLabelText("Email");
      expect(emailInput).toBeInTheDocument();
      // expect(inputCount).toBe(2)
    });
    it("has password input", () => {
      render(SignUpPage);
      const passwordInput = screen.queryByLabelText("Password");
      expect(passwordInput).toBeInTheDocument();
    });
    it("password type for password input", () => {
      render(SignUpPage);
      const passwordInput = screen.queryByLabelText("Password");
      expect(passwordInput.type).toBe("password");
    });
    it("has password repeat input", () => {
      render(SignUpPage);
      const password2Input = screen.queryByLabelText("Repeat Password");
      expect(password2Input).toBeInTheDocument();
    });
    it("password type for password repeat input", () => {
      render(SignUpPage);
      const password2Input = screen.queryByLabelText("Repeat Password");
      expect(password2Input.type).toBe("password");
    });
    it("has a sign up button", () => {
      render(SignUpPage);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });
    it("disables button initially", () => {
      render(SignUpPage);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });
  describe("interactions", () => {
    it("enables the button when the password & password repeat fields have the same value", async () => {
      render(SignUpPage);
      const passwordInput = screen.queryByLabelText("Password");
      const password2Input = screen.queryByLabelText("Repeat Password");
      await userEvent.type(passwordInput, "Password123");
      await userEvent.type(password2Input, "Password123");
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).not.toBeDisabled();
    });
  });
});
