import { Component } from 'react';

import Word from '../word/word';
import Guess from '../guess/guess';
import Keyboard from '../keyboard/keyboard';
import EndGame from '../endgame/endgame';

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
            started: this.props.secret ? true : false,
            notAWord: false,
            spin: false,
            jump: false,
            win: false,
            shareable: [],
            displayEnd: false
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

    toggleDisplayEnd = () => {
        const { displayEnd } = this.state;
        this.setState({ displayEnd: !displayEnd });
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
            this.setState({ currentLetters, notAWord: false, spin: false, jump: false });
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
        const { currentLetters, guessedWords, usedLetters, yellowLetters, greenLetters, secret, shareable } = this.state;
        if (currentLetters.length !== 5) return;
        let currentWord = currentLetters.join('');

        //word already guessed
        if (guessedWords.indexOf(currentWord) !== -1) {
            return;
        }

        //Check if word exists
        let { exists } = await this.wordExists(currentWord.toLowerCase())
            .catch(err => {
                console.error(err);
            });

        if (!exists) {
            return this.setState({ notAWord: true });
        } else {
            this.setState({ notAWord: false });
        }

        if (currentWord === 'SPINS') {
            this.setState({ spin: true });
        } else if (currentWord === 'JUMPS') {
            this.setState({ jump: true });
        }

        currentLetters.splice(0, 5);
        this.setState({ currentLetters });

        shareable.push([]);

        //Update used letters, in word / in position
        for (let letter in currentWord) {
            if (currentWord[letter] === secret[letter]) {
                greenLetters.push(currentWord[letter]);
                shareable[guessedWords.length].push('green');
            } else if (this.state.secret.indexOf(currentWord[letter]) >= 0) {
                yellowLetters.push(currentWord[letter]);
                shareable[guessedWords.length].push('yellow');
            } else {
                usedLetters.push(...currentWord);
                shareable[guessedWords.length].push('grey');
            }
        }

        this.setState({ usedLetters, yellowLetters, greenLetters, shareable });

        //Add new word to guessed history and reset the guessing row
        guessedWords.push(currentWord);
        this.setState({ guessedWords });

        //Check if it's the correct word
        if (guessedWords[guessedWords.length - 1] === secret) {
            this.setState({ gameover: true, win: true, displayEnd: true });
            return;
        }

        //Check if it's the final guess
        if (guessedWords.length === 6) {
            this.setState({ gameover: true, win: false, displayEnd: true });
            return;
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

        const { guessedWords, currentLetters, usedLetters, yellowLetters, greenLetters, secret, saveDisabled, started, notAWord, spin, jump, win, gameover, shareable, displayEnd } = this.state;

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
                <div className={`words ${spin === true ? 'spin' : jump === true ? 'jump' : ''}`}>
                    {guessedWords[0] ? <Word word={guessedWords[0]} shareable={shareable[0]} /> : <Word />}
                    {guessedWords[1] ? <Word word={guessedWords[1]} shareable={shareable[1]} /> : <Word />}
                    {guessedWords[2] ? <Word word={guessedWords[2]} shareable={shareable[2]} /> : <Word />}
                    {guessedWords[3] ? <Word word={guessedWords[3]} shareable={shareable[3]} /> : <Word />}
                    {guessedWords[4] ? <Word word={guessedWords[4]} shareable={shareable[4]} /> : <Word />}
                    {guessedWords[5] ? <Word word={guessedWords[5]} shareable={shareable[5]} /> : <Word />}
                    <Guess currentLetters={currentLetters} notAWord={notAWord} />
                </div>

                <Keyboard input={this.inputLetter} backspace={this.backspace} enter={this.enter} usedLetters={usedLetters} yellowLetters={yellowLetters} greenLetters={greenLetters} />

                {gameover ? <EndGame win={win} guesses={guessedWords} secret={secret} shareable={shareable} displayEnd={displayEnd} toggleDisplayEnd={this.toggleDisplayEnd} /> : null}

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