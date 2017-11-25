import {curry, concat, filter, some, every, map, identity} from 'lodash/fp';

export const create = () => ({
    board: ['', '', '', '', '', '', '', '', ''],
    turn: 'X',
    status: {state: 'IN_GAME'}
});

const getOtherPlayer = model => model.turn === 'X' ? 'O' : 'X';
const switchPlayer = model => ({...model, turn: getOtherPlayer(model)});
const updateStatus = (model, winner) => {
    if (winner) {
        return {...model, status: {state: 'WINNER', winner}};
    } else {
        return {...model, status: {state: 'TIE'}};
    }
};
const getRows = ({board}) => [
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]]
];
const getColumns = ({board}) => [
    [board[0], board[3], board[6]],
    [board[1], board[4], board[7]],
    [board[2], board[5], board[8]]
];
const getDiags = ({board}) => [
    [board[0], board[4], board[8]],
    [board[2], board[4], board[6]]
];

const getWinner = model => {
    const players = ['X', 'O'];
    const toCheck = concat(concat(getRows(model), getColumns(model)), getDiags(model));
    const didWin = player => {
        return some(every(x => x === player), toCheck);
    };

    const playerWon = map(didWin, players);
    if (playerWon[0] === true) {
        return 'X';
    } else if (playerWon[1] === true) {
        return 'O';
    } else {
        return null;
    }
};

const didGameFinish = model => {
    return some(identity, [
        filter(x => x !== '', model.board).length === model.board.length,
        getWinner(model) !== null
    ]);
};

const next = model => {
    if (didGameFinish(model)) {
        const winner = getWinner(model);
        return updateStatus(model, winner);
    } else {
        return switchPlayer(model);
    }
};

export const updateBoard = curry((position, model) => {
    const newBoard = [...model.board];

    if (didGameFinish(model)) {
        return {...model};
    }

    if (newBoard[position] === '') {
        newBoard[position] = model.turn;
    } else {
        return {...model, error: 'Try an empty tile!'};
    }
    return next({...model, board: newBoard, error: ''});
});

export const isFinished = model => {
    return model.status.state !== 'IN_GAME';
};

export const restart = model => {
    return create();
};
