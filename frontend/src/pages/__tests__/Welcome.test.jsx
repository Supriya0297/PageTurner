import {it, expect, describe} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Welcome from '../Welcome.jsx';

describe('tests for Welcome component', () =>{

it('tests rendering welcome message', () => {
    // step1: ARRANGE render the component to test
    render(<Welcome/>);

    // step2: accessing the elements from the component
    const headerElement = screen.getByText("Welcome to ");

    // step3: validate this using asserts
    expect(headerElement).toBeInTheDocument();
});

it('tests rendering paragraph message', () => {
    // step1: ARRANGE render the component to test
    render(<Welcome/>);

    // step2: accessing the elements from the component
    const paraElement = screen.getByRole('paragraph');

    // step3: validate this using asserts
    expect(paraElement).toBeInTheDocument();
    expect(paraElement.textContent).equals('');
});


it('tests button click event', async () => {
    // step1: ARRANGE render the component to test
    render(<Welcome/>);

    // step2: ACT accessing the elements from the component
    const user = userEvent.setup();
    const buttonElement = screen.findByRole('button','click me');
    await user.click(buttonElement);
    //user.type(inputEle,'hello');
    const paraElement = screen.findByRole('paragraph');
    expect(paraElement.textContent).equals('button is clicked');
    
})
});