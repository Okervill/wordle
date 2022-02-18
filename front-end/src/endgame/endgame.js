import { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


import './endgame.css';

class EndGame extends Component {

    share = (e) => {
        //from https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
        //once hosted on https will update to navigator.clipboard
        let range = document.createRange();
        range.selectNode(document.getElementById("end-game-share"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
    }

    componentDidMount() {
        const { win, guesses } = this.props;
        let played = JSON.parse(localStorage.getItem('played'));
        let link = window.location.pathname.split('/')[2];
        if (!played) {
            played = [{
                link: link,
                guesses: guesses.length,
                win: win
            }];
        } else if (!played.find(x => x.link === link)) {
            played.push({
                link: link,
                guesses: guesses.length,
                win: win
            })
        }
        localStorage.setItem('played', JSON.stringify(played));
    }

    render() {
        const { win, secret, shareable, displayEnd, guesses } = this.props;

        if (!displayEnd) {
            return (null);
        }

        let green = '🟩';
        let yellow = '🟨';
        let grey = '⬛';

        let shareableRows = `${guesses.length} / 6\n`;
        for (let guess of shareable) {
            for (let char of guess) {
                if (char === 'green') {
                    shareableRows += green;
                } else if (char === 'yellow') {
                    shareableRows += yellow;
                } else if (char === 'grey') {
                    shareableRows += grey;
                }
            }
            shareableRows += '\n';
        }

        let endGameText = `${window.location.href}\n${shareableRows}`;

        return (
            <div className='end-game'>
                <div className='end-game-close-button-container' onClick={this.props.toggleDisplayEnd}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </div>
                <div className='end-game-items'>
                    {!win ? <div className='end-game-word'>The word is: {secret}</div> : null}
                    <div className='end-game-share' id='end-game-share' ref={(div) => this.textArea = div}>{endGameText}</div>
                    <button className='end-game-share-button' onClick={this.share}>Copy</button>
                </div>
            </div>
        );
    }
}

export default EndGame;