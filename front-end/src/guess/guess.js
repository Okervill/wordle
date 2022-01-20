import React, { Component } from 'react';
import Letter from '../letter/letter';

class Guess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLetters: this.props.currentLetters
        }
    }

    render() {
        const { currentLetters } = this.state;

        return (
            <div className='word input'>
                <Letter letter={currentLetters[0] ? currentLetters[0] : null} guessInput={true} />
                <Letter letter={currentLetters[1] ? currentLetters[1] : null} guessInput={true} />
                <Letter letter={currentLetters[2] ? currentLetters[2] : null} guessInput={true} />
                <Letter letter={currentLetters[3] ? currentLetters[3] : null} guessInput={true} />
                <Letter letter={currentLetters[4] ? currentLetters[4] : null} guessInput={true} />
            </div>
        );
    }
}

export default Guess;