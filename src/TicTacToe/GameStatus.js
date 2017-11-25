import React from 'react';
import {isFinished} from './Model';

export default function GameStatus({model}) {
    const error = model.error;

    return (
        <div className="TicTacToe_GameStatus">
            <strong>{getStatusText(model)}</strong>

            {error &&
             <p>{error}</p>
            }

        </div>
    );
}

function getStatusText(model) {
    const isTie = model.status.state === 'TIE';
    const winner = model.status.winner;

    if (isFinished(model)) {
        if (isTie) {
            return 'Game finished, we have to champions!';
        } else {
            return 'After a fierce battle the winner is ' + winner;
        }
    } else {
        return 'It is ' + model.turn + '\'s turn';
    }
}
