import { Component } from 'react';
import Letter from '../letter/letter';
import './word.css';

class Word extends Component {

    render() {
        const { word, shareable } = this.props;

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

        return (
            <div className='word'>
                {word.split('').map((letter, index) => {
                    return (
                        <Letter key={index} letter={letter} green={shareable[index] === 'green'} yellow={shareable[index] === 'yellow'} grey={shareable[index] === 'grey'} />
                    );
                })}
            </div>
        );
    }
}

export default Word;