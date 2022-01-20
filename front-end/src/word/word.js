import { Component } from 'react';
import Letter from '../letter/letter';
import './word.css';

class Word extends Component {

    render() {
        const { word, secret } = this.props;

        if (!word || word.length < 5) {
            return (
                <div className='word'>
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
                </div>
            )
        }

        const greenLetters = [];
        const yellowLetters = [];

        let tmpSecret = secret.split('');

        //get greens
        for (let letter in word) {
            if (word[letter] === secret[letter]) {
                greenLetters.push(parseInt(letter));
                tmpSecret.splice(letter, 1, '');
            }
        }

        //get yellows
        for (let letter in word) {
            if (tmpSecret.indexOf(word[letter]) >= 0) {
                yellowLetters.push(parseInt(letter));
                tmpSecret.splice(letter, 1, '');
            }
        }

        return (
            <div className='word'>
                {word.split('').map((letter, index) => {
                    return (
                        <Letter key={index} letter={letter} green={greenLetters.indexOf(index) >= 0 ? true : false} yellow={yellowLetters.indexOf(index) >= 0 ? true : false} grey={true} />
                    );
                })}
            </div>
        );
    }
}

export default Word;