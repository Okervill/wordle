import { Component } from 'react';
import './letter.css';

class Letter extends Component {

    render() {
        const { letter, green, yellow, grey, guessInput } = this.props;
        if (guessInput) {
            return (
                <div className={'letter guess'}>
                    {letter}
                </div>
            )
        }
        return (
            <div className={'letter' + (green ? ' green' : '') + (yellow ? ' yellow' : '') + (grey ? ' grey' : '')}>
                {letter}
            </div>
        );
    }
}

export default Letter;