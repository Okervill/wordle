import { Component } from 'react';

import Word from '../word/word';
import Guess from '../guess/guess';
import Keyboard from '../keyboard/keyboard';

import './gameboard.css';

class GameBoard extends Component {
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
            secret: this.props.secret ? this.props.secret : '',
            saveDisabled: true,
            started: this.props.secret ? true : false
        }
    }

    async componentDidMount() {
        let pathname = window.location.pathname;
        let wordUid = '';
        if (pathname.split('/').length === 3) {
            wordUid = window.location.pathname.split('/')[2];
        }
        let { word } = await getWordFromPath(wordUid);
        if (word.length !== 5) return;
        this.setState({
            secret: word.toUpperCase(),
            started: true
        });
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


    wordExists(word) {
        return new Promise(async (resolve, reject) => {
            fetch(`http://80.85.85.72:3005/word/${word}`)
                .then(res => res.json())
                .then(res => {
                    return resolve(res);
                })
                .catch(err => {
                    return reject(err)
                });
        });
    }

    enter = async () => {
        const { currentLetters, guessedWords, usedLetters, yellowLetters, greenLetters, secret } = this.state;
        if (currentLetters.length !== 5) return;
        let currentWord = currentLetters.join('');

        //word already guessed
        if (guessedWords.indexOf(currentWord) !== -1) {
            return;
        }

        //Check if word exists
        let wordExists = await this.wordExists(currentWord.toLowerCase())
            .catch(err => {
                console.error(err);
            });

        if(!wordExists) {
            console.log('fake word')
        } else {
            console.log('real word')
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
            this.setState({ message: `Game Over! The word was ${secret}`, gameover: true });
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

function getWordFromPath(uid) {
    return new Promise(async (resolve, reject) => {
        fetch(`http://80.85.85.72:3005/game/${uid}`)
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err)
            });
    });
}

export default GameBoard;