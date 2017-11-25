import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';
import TicTacToe from './TicTacToe';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Counter />
                <hr />
                <TicTacToe />
            </div>
        );
    }
}

export default App;
