import React, { Component } from 'react';
import './keyboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

class Keyboard extends Component {

    onClick = (letter) => {
        this.props.input(letter);
    }

    onClickBackSpace = () => {
        this.props.backspace();
    }
    onClickEnter = () => {
        this.props.enter();
    }

    render() {

        const { usedLetters, yellowLetters, greenLetters } = this.props;

        return (
            <div className='keyboard' onKeyPress={() => this.onKeyPress()}>
                <div className='row'>
                    <div onClick={() => this.onClick('Q')} className={'key ' + (greenLetters.indexOf('Q') >= 0 ? 'green' : yellowLetters.indexOf('Q') >= 0 ? 'yellow' : usedLetters.indexOf('Q') >= 0 ? 'grey' : '')}>Q</div>
                    <div onClick={() => this.onClick('W')} className={'key ' + (greenLetters.indexOf('W') >= 0 ? 'green' : yellowLetters.indexOf('W') >= 0 ? 'yellow' : usedLetters.indexOf('W') >= 0 ? 'grey' : '')}>W</div>
                    <div onClick={() => this.onClick('E')} className={'key ' + (greenLetters.indexOf('E') >= 0 ? 'green' : yellowLetters.indexOf('E') >= 0 ? 'yellow' : usedLetters.indexOf('E') >= 0 ? 'grey' : '')}>E</div>
                    <div onClick={() => this.onClick('R')} className={'key ' + (greenLetters.indexOf('R') >= 0 ? 'green' : yellowLetters.indexOf('R') >= 0 ? 'yellow' : usedLetters.indexOf('R') >= 0 ? 'grey' : '')}>R</div>
                    <div onClick={() => this.onClick('T')} className={'key ' + (greenLetters.indexOf('T') >= 0 ? 'green' : yellowLetters.indexOf('T') >= 0 ? 'yellow' : usedLetters.indexOf('T') >= 0 ? 'grey' : '')}>T</div>
                    <div onClick={() => this.onClick('Y')} className={'key ' + (greenLetters.indexOf('Y') >= 0 ? 'green' : yellowLetters.indexOf('Y') >= 0 ? 'yellow' : usedLetters.indexOf('Y') >= 0 ? 'grey' : '')}>Y</div>
                    <div onClick={() => this.onClick('U')} className={'key ' + (greenLetters.indexOf('U') >= 0 ? 'green' : yellowLetters.indexOf('U') >= 0 ? 'yellow' : usedLetters.indexOf('U') >= 0 ? 'grey' : '')}>U</div>
                    <div onClick={() => this.onClick('I')} className={'key ' + (greenLetters.indexOf('I') >= 0 ? 'green' : yellowLetters.indexOf('I') >= 0 ? 'yellow' : usedLetters.indexOf('I') >= 0 ? 'grey' : '')}>I</div>
                    <div onClick={() => this.onClick('O')} className={'key ' + (greenLetters.indexOf('O') >= 0 ? 'green' : yellowLetters.indexOf('O') >= 0 ? 'yellow' : usedLetters.indexOf('O') >= 0 ? 'grey' : '')}>O</div>
                    <div onClick={() => this.onClick('P')} className={'key ' + (greenLetters.indexOf('P') >= 0 ? 'green' : yellowLetters.indexOf('P') >= 0 ? 'yellow' : usedLetters.indexOf('P') >= 0 ? 'grey' : '')}>P</div>
                </div>
                <div className='row'>
                    <div onClick={() => this.onClick('A')} className={'key ' + (greenLetters.indexOf('A') >= 0 ? 'green' : yellowLetters.indexOf('A') >= 0 ? 'yellow' : usedLetters.indexOf('A') >= 0 ? 'grey' : '')}>A</div>
                    <div onClick={() => this.onClick('S')} className={'key ' + (greenLetters.indexOf('S') >= 0 ? 'green' : yellowLetters.indexOf('S') >= 0 ? 'yellow' : usedLetters.indexOf('S') >= 0 ? 'grey' : '')}>S</div>
                    <div onClick={() => this.onClick('D')} className={'key ' + (greenLetters.indexOf('D') >= 0 ? 'green' : yellowLetters.indexOf('D') >= 0 ? 'yellow' : usedLetters.indexOf('D') >= 0 ? 'grey' : '')}>D</div>
                    <div onClick={() => this.onClick('F')} className={'key ' + (greenLetters.indexOf('F') >= 0 ? 'green' : yellowLetters.indexOf('F') >= 0 ? 'yellow' : usedLetters.indexOf('F') >= 0 ? 'grey' : '')}>F</div>
                    <div onClick={() => this.onClick('G')} className={'key ' + (greenLetters.indexOf('G') >= 0 ? 'green' : yellowLetters.indexOf('G') >= 0 ? 'yellow' : usedLetters.indexOf('G') >= 0 ? 'grey' : '')}>G</div>
                    <div onClick={() => this.onClick('H')} className={'key ' + (greenLetters.indexOf('H') >= 0 ? 'green' : yellowLetters.indexOf('H') >= 0 ? 'yellow' : usedLetters.indexOf('H') >= 0 ? 'grey' : '')}>H</div>
                    <div onClick={() => this.onClick('J')} className={'key ' + (greenLetters.indexOf('J') >= 0 ? 'green' : yellowLetters.indexOf('J') >= 0 ? 'yellow' : usedLetters.indexOf('J') >= 0 ? 'grey' : '')}>J</div>
                    <div onClick={() => this.onClick('K')} className={'key ' + (greenLetters.indexOf('K') >= 0 ? 'green' : yellowLetters.indexOf('K') >= 0 ? 'yellow' : usedLetters.indexOf('K') >= 0 ? 'grey' : '')}>K</div>
                    <div onClick={() => this.onClick('L')} className={'key ' + (greenLetters.indexOf('L') >= 0 ? 'green' : yellowLetters.indexOf('L') >= 0 ? 'yellow' : usedLetters.indexOf('L') >= 0 ? 'grey' : '')}>L</div>
                </div>
                <div className='row'>
                    <div onClick={() => this.onClickEnter()} className='key larger'>Enter</div>
                    <div onClick={() => this.onClick('Z')} className={'key ' + (greenLetters.indexOf('Z') >= 0 ? 'green' : yellowLetters.indexOf('Z') >= 0 ? 'yellow' : usedLetters.indexOf('Z') >= 0 ? 'grey' : '')}>Z</div>
                    <div onClick={() => this.onClick('X')} className={'key ' + (greenLetters.indexOf('X') >= 0 ? 'green' : yellowLetters.indexOf('X') >= 0 ? 'yellow' : usedLetters.indexOf('X') >= 0 ? 'grey' : '')}>X</div>
                    <div onClick={() => this.onClick('C')} className={'key ' + (greenLetters.indexOf('C') >= 0 ? 'green' : yellowLetters.indexOf('C') >= 0 ? 'yellow' : usedLetters.indexOf('C') >= 0 ? 'grey' : '')}>C</div>
                    <div onClick={() => this.onClick('V')} className={'key ' + (greenLetters.indexOf('V') >= 0 ? 'green' : yellowLetters.indexOf('V') >= 0 ? 'yellow' : usedLetters.indexOf('V') >= 0 ? 'grey' : '')}>V</div>
                    <div onClick={() => this.onClick('B')} className={'key ' + (greenLetters.indexOf('B') >= 0 ? 'green' : yellowLetters.indexOf('B') >= 0 ? 'yellow' : usedLetters.indexOf('B') >= 0 ? 'grey' : '')}>B</div>
                    <div onClick={() => this.onClick('N')} className={'key ' + (greenLetters.indexOf('N') >= 0 ? 'green' : yellowLetters.indexOf('N') >= 0 ? 'yellow' : usedLetters.indexOf('N') >= 0 ? 'grey' : '')}>N</div>
                    <div onClick={() => this.onClick('M')} className={'key ' + (greenLetters.indexOf('M') >= 0 ? 'green' : yellowLetters.indexOf('M') >= 0 ? 'yellow' : usedLetters.indexOf('M') >= 0 ? 'grey' : '')}>M</div>
                    <div onClick={() => this.onClickBackSpace()} className='key larger'><FontAwesomeIcon icon={faBackspace} /></div>
                </div>
            </div>
        );
    };
}

export default Keyboard;