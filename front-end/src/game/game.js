import React from 'react';
import { useNavigate } from 'react-router-dom';

function Game() {

    const navigate = useNavigate();
    const getRandom = async () => {
        let { uuid } = await getRandomWord();

        let path = `/game/${uuid}`;
        routeChange(path);
    }
    const routeChange = (path) => {
        navigate(path);
    }

    const getRandomWord = () => {
        return new Promise(async (resolve, reject) => {
            fetch('http://80.85.85.72:3005/game/random')
                .then(res => res.json())
                .then(res => {
                    return resolve(res);
                })
                .catch(err => {
                    return reject(err)
                });
        });
    }

    return (
        <div className='game-page'>
            <button onClick={getRandom}>Random Word</button>
        </div>
    )
}

export default Game;