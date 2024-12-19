/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createContext } from 'react';

export const GameContext = createContext();

const GameContextProvider = (props) => {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [wins, setWins] = useState({ X: 0, O: 0 });
	const [winner, setWinner] = useState('');
	const [players, setPlayers] = useState({
		player1: 'Player1',
		player2: 'Player2',
	});

	const handleSquareClick = (index) => {
		if (squares[index] || getResult[squares]) return;

		const newSquares = squares.slice();
		newSquares[index] = isXNext ? 'X' : '0';
		setSquares(newSquares);
		setIsXNext(!isXNext);
	};

	const getResult = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let line of lines) {
			const [a, b, c] = line;
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	};

	const getBgClass = (value) => {
		if (value === 'X') return 'bg-green-500';
		if (value === '0') return 'bg-red-500';
		return 'bg-gray-800';
	};

	const value = {
		squares,
		setSquares,
		winner,
		setWinner,
		setIsXNext,
		wins,
		setWins,
		getResult,
		handleSquareClick,
		getBgClass,
		players,
		setPlayers,
	};

	return (
		<GameContext.Provider value={value}>{props.children}</GameContext.Provider>
	);
};

export default GameContextProvider;
