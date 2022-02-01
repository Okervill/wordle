import React, { Component } from 'react';
import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyWords: []
        }
    }

    async componentDidMount() {
        let dailyWords = await getDailyWords()
            .catch(err => {
                console.log(err);
            });
        this.setState({ ...dailyWords });
    }

    render() {
        const { dailyWords } = this.state;
        if (dailyWords.length === 0) {
            return (<>Nothing found</>)
        } else {
            return (
                <div className='home-page'>
                    {dailyWords.map((wordInfo, index) => {
                        return (
                            <div key={index}><a href={`/game/${wordInfo.uuid}`}>{moment(wordInfo.dateused, 'YYYYMMDD', true).format('Do MMM YYYY')}</a></div>
                        )
                    })}
                </div>
            )
        }
    }
}

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