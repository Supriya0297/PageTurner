import {it, expect, describe} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInPage from '../SignInPage';

describe('tests for SignInPage', () => {

    it('tests rendering of username and password and sign in button', () =>{
        render(<SignInPage/>);
        const passwordElement = screen.getAllByPlaceholderText('Atleast 6 characters');
       
    })

     it('tests signin functionality', async () =>{
        render(<SignInPage/>);
        //const loginButtonELement = screen.getAllByPlaceholderText('Atleast 6 characters');
        const passwordElement = screen.getAllByPlaceholderText('Atleast 6 characters');
        const user = userEvent.setup();
        await user.type(passwordElement, 'Piyush1234');
        await user.click()

    })

})