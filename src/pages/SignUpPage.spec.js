import SignUpPage from './SignUpPage.vue';

// const SignUpPage = require('./SignUpPage.vue');

const vtl = require('@testing-library/vue');

const {render, screen} = vtl;

it('has sign up header', () => {
    render(SignUpPage);
    const header = screen.queryByRole("heading", {name: "Sign Up"});
    expect(header).not.toBeNull();
})