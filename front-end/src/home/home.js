import React, { Component } from 'react';
// import { withCookies, Cookies } from 'react-cookie';
// import { instanceOf } from 'prop-types';
import moment from 'moment';

import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyWords: []
        }
    }

    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    async componentDidMount() {
        let dailyWords = await getDailyWords()
            .catch(err => {
                console.log(err);
            });
        this.setState({ ...dailyWords });
    }

    // handleCookie = () => {
    //     const { cookies } = this.props;
    //     cookies.set("user", "patrick", { path: '/' });
    //     console.log('set cookie');
    // }

    getTodaysGame() {
        let allGames = this.state.dailyWords;
        let today = moment().format('YYYYMMDD');
        let todaysGame = allGames.find(game => game.dateused === today);
        let path = `/game/${todaysGame.uuid}`
        window.location.href = path;
    }

    getRandomGame() {
        fetch('http://80.85.85.72:3005/game/random')
            .then(res => res.json())
            .then(res => {
                let path = `/game/${res.uuid}`;
                window.location.href = path;
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { dailyWords } = this.state;
        if (dailyWords.length === 0) {
            return (<>Nothing found</>)
        } else {
            return (
                <div className='home-page'>
                    <div className='home-page-play-buttons'>
                        <button className='home-page-button' onClick={() => this.getTodaysGame()}>Play Todays Word!</button>
                        <button className='home-page-button' onClick={() => this.getRandomGame()}>Play Random Word!</button>
                    </div>
                    <table className='daily-puzzles-table'>
                        <thead>
                            <tr className='daily-puzzles-table-header-row'>
                                <th className='daily-puzzles-table-header-cell'>Day</th>
                                <th className='daily-puzzles-table-header-cell'>Guesses</th>
                                <th className='daily-puzzles-table-header-cell'>Solved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyWords.map((wordInfo, index) => {
                                return (
                                    <tr className='daily-puzzles-table-content-row' key={index}>
                                        <td className='daily-puzzles-table-content-cell'><a href={`/game/${wordInfo.uuid}`}>Day {dailyWords.length - index} - {moment(wordInfo.dateused, 'YYYYMMDD', true).format('Do MMM YYYY')}</a></td>
                                        <td className='daily-puzzles-table-content-cell'></td>
                                        <td className='daily-puzzles-table-content-cell'></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

// export default withCookies(Home);
export default Home;

function getDailyWords() {
    return new Promise((resolve, reject) => {
        fetch('http://80.85.85.72:3005/daily/all')
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            });
    });
}