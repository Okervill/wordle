import { Component } from 'react';
import Word from '../word/word';
import Guess from '../guess/guess';
import Keyboard from '../keyboard/keyboard';

import './game.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guessedWords: [],
            currentLetters: [],
            usedLetters: [],
            yellowLetters: [],
            greenLetters: [],
            message: '',
            gameover: false,
            secret: '',
            saveDisabled: true,
            started: false
        }
    }

    inputLetter = (letter) => {
        const { currentLetters, gameover } = this.state;
        if (gameover) return;
        if (currentLetters.length < 5) {
            currentLetters.push(letter);
            this.setState({ currentLetters });
        }
    }

    backspace = () => {
        const { currentLetters } = this.state;
        if (currentLetters.length > 0) {
            currentLetters.pop();
            this.setState({ currentLetters });
        }
    }

    enter = () => {
        const { currentLetters, guessedWords, usedLetters, yellowLetters, greenLetters } = this.state;
        if (currentLetters.length !== 5) return;
        let currentWord = currentLetters.join('');

        //word already guessed
        if (guessedWords.indexOf(currentWord) !== -1) {
            return;
        }

        //Update used letters, in word / in position
        for (let letter in currentLetters) {
            if (currentWord[letter] === this.state.secret[letter]) {
                greenLetters.push(currentWord[letter]);
            } else if (this.state.secret.indexOf(currentWord[letter]) >= 0) {
                yellowLetters.push(currentWord[letter]);
            } else {
                usedLetters.push(...currentLetters);
            }
        }
        this.setState({ usedLetters, yellowLetters, greenLetters });

        //Add new word to guessed history and reset the guessing row
        guessedWords.push(currentWord);
        currentLetters.splice(0, 5);
        this.setState({ guessedWords, currentLetters });

        //Check if it's the correct word
        if (guessedWords[guessedWords.length - 1] === this.state.secret) {
            this.setState({ message: 'You got it!', gameover: true });
        }

        //Check if it's the final guess
        if (guessedWords.length === 6) {
            this.setState({ message: 'Game Over!', gameover: true });
        }
    }

    onKeyPress = (event) => {
        if (event.which >= 65 && event.which <= 90) {
            this.inputLetter(event.key.toUpperCase());
        }
        if (event.which === 8) {
            this.backspace();
        }
        if (event.which === 13) {
            this.enter();
        }
    }

    enterSecret = (event) => {
        this.setState({ [event.target.name]: event.target.value.toUpperCase() });
        if (event.target.value.length === 5) {
            this.setState({ saveDisabled: false });
        } else {
            this.setState({ saveDisabled: true });
        }
    }

    saveSecret = () => {
        this.setState({ started: true });
    }

    render() {

        const { guessedWords, currentLetters, message, usedLetters, yellowLetters, greenLetters, secret, saveDisabled, started } = this.state;

        if (!secret || secret.length < 5 || !started) {
            return (
                <div className='game'>
                    <input type='text' value={secret} name='secret' onChange={this.enterSecret} maxLength={5} />
                    <button type='submit' disabled={saveDisabled} onClick={() => this.saveSecret()}>Save</button>
                </div>
            )
        }
        return (
            <div className='game' onKeyDown={this.onKeyPress} tabIndex={-1}>
                <div className='words'>
                    {guessedWords[0] ? <Word word={guessedWords[0]} secret={secret} /> : <Word secret={secret} />}
                    {guessedWords[1] ? <Word word={guessedWords[1]} secret={secret} /> : <Word secret={secret} />}
                    {guessedWords[2] ? <Word word={guessedWords[2]} secret={secret} /> : <Word secret={secret} />}
                    {guessedWords[3] ? <Word word={guessedWords[3]} secret={secret} /> : <Word secret={secret} />}
                    {guessedWords[4] ? <Word word={guessedWords[4]} secret={secret} /> : <Word secret={secret} />}
                    {guessedWords[5] ? <Word word={guessedWords[5]} secret={secret} /> : <Word secret={secret} />}
                    <Guess currentLetters={currentLetters} />
                </div>

                <Keyboard input={this.inputLetter} backspace={this.backspace} enter={this.enter} usedLetters={usedLetters} yellowLetters={yellowLetters} greenLetters={greenLetters} />

                {message.length > 0 ? message : null}
            </div>
        );
    }
}

export default Game;