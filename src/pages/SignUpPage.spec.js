import SignUpPage from "./SignUpPage.vue";
import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "whatwg-fetch";


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
    const setup = async() => {
      render(SignUpPage);
      const usernameInput = screen.queryByLabelText("Username");
      const emailInput = screen.queryByLabelText("Email");
      const passwordInput = screen.queryByLabelText("Password");
      const password2Input = screen.queryByLabelText("Repeat Password");
      await userEvent.type(usernameInput, "user1");
      await userEvent.type(emailInput, "email@email.com");
      await userEvent.type(passwordInput, "Password123");
      await userEvent.type(password2Input, "Password123");
    }

    it("enables the button when the password & password repeat fields have the same value", async () => {
      render(SignUpPage);
      const passwordInput = screen.queryByLabelText("Password");
      const password2Input = screen.queryByLabelText("Repeat Password");
      await userEvent.type(passwordInput, "Password123");
      await userEvent.type(password2Input, "Password123");
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).not.toBeDisabled();
    });

    it("sends user info to backend", async () => {
     await setup()
      const button = screen.queryByRole("button", { name: "Sign Up" });

      const mockFn = jest.fn();

      axios.post = mockFn;

      await userEvent.click(button);

      const firstCall = mockFn.mock.calls[0];

      const body = firstCall[1];

      expect(body).toEqual({
        username: "user1",
        email: "email@email.com",
        password: "Password123",
      });
    });

    it("does not allow button to be clicked while there is an ongoing api call", async () => {
      let counter = 0
      async() => {
       const server = setupServer(
          rest.post("api/1.0.users", (req, res, ctx) => {
            counter += 1
            requestBody = req.body
            return (res(ctx.status(200)))
          })
        )
  
      server.listen()

      await setup()
    
      const button = screen.queryByRole("button", { name: "Sign Up" });

      await userEvent.click(button)

      await userEvent.click(button)

      await server.close()
      expect(counter).toBe(1)
        }

  });
  it("displays spinner while api request is in progress", async() => {
    async() => {  
    const server = setupServer(
         rest.post("api/1.0.users", (req, res, ctx) => {
           requestBody = req.body
           return (res(ctx.status(200)))
         })
       )
     
     server.listen()
    
    await setup()
    const button = screen.queryByRole("button", { name: "Sign Up" });

    await userEvent.click(button)

    const spinner = screen.queryByRole("status")
    expect(spinner).toBeInTheDocument()
        }
  });
  it("it does not display spinner when there is no api request", async () => {
    await setup();
    const spinner = screen.queryByRole("status")
    expect(spinner).not.toBeInTheDocument()
  })
});
});
