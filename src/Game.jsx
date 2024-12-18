import { useEffect } from 'react';
import { useState } from 'react';

const Game = () => {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [wins, setWins] = useState({ X: 0, O: 0 });
	const [winner, setWinner] = useState('');

	const handleClick = (index) => {
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
		return 'bg-black';
	};

	useEffect(() => {
		const newWinner = getResult(squares);
		setWinner(newWinner);

		if (newWinner) {
			setWins((prev) => ({
				X: newWinner === 'X' ? prev.X + 1 : prev.X,
				O: newWinner === '0' ? prev.O + 1 : prev.O,
			}));
		}
	}, [squares]);

	useEffect(() => {
		if (wins.X || wins.O) {
			localStorage.setItem('wins', JSON.stringify(wins));
		}
	}, [wins]);

	useEffect(() => {
		const savedWinCount = JSON.parse(localStorage.getItem('wins'));
		if (savedWinCount) setWins(savedWinCount);
	}, []);

	const resetGame = () => {
		setSquares(Array(9).fill(null));
		setIsXNext(true);
		setWinner('');
	};

	const resetCounter = () => {
		const resetWins = { X: 0, O: 0 };
		setWins(resetWins);
		localStorage.setItem('wins', JSON.stringify(resetWins));
	};

	return (
		<div className='flex flex-col gap-5 justify-center items-center w-full min-h-[100vh]'>
			<h1 className='text-2xl font-medium'>Tic-Tac-Toe</h1>
			<div className='grid grid-cols-3 gap-2 p-2 border-2 border-black w-fit'>
				{squares.map((item, index) => (
					<button
						key={index}
						onClick={() => handleClick(index)}
						className={`${getBgClass(
							item
						)} text-white h-[80px] w-[80px] text-center  active:scale-95 transition-all duration-75 ease-in-out`}
						disabled={winner ? true : false}
					>
						{item}
					</button>
				))}
			</div>
			{winner && (
				<p className='text-xl bg-green-500 text-white px-5 py-1'>
					Winner is: {winner}
				</p>
			)}
			{!winner && !squares.some((el) => el === null) && (
				<p className='text-xl bg-gray-500 text-white px-5 py-1'>
					Draw! Play Again.
				</p>
			)}

			<div className='flex gap-5'>
				<p className='px-5 py-1 bg-green-500 text-white text-base'>
					X wins: <span className='font-bold'> {wins.X}</span>
				</p>
				<p className='px-5 py-1 bg-red-500 text-white text-base'>
					0 wins: <span className='font-bold'> {wins.O}</span>
				</p>
			</div>
			<div className='flex gap-5'>
				<button
					onClick={resetGame}
					className='bg-orange-500 text-white px-5 py-2 active:scale-90 transition-all duration-75 ease-in-out'
				>
					Restart
				</button>
				<button
					onClick={resetCounter}
					className='bg-gray-500 text-white px-5 py-2 active:scale-90 transition-all duration-75 ease-in-out'
				>
					Reset Win Counter
				</button>
			</div>
		</div>
	);
};

export default Game;
