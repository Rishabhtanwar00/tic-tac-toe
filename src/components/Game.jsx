import { useContext, useEffect } from 'react';
// import FunFacts from './components/FunFacts';
// import Instructions from './components/Instructions';
import PlayersForm from './PlayersForm';
import { GameContext } from '../context/GameContext';

const Game = () => {
	const {
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
	} = useContext(GameContext);

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
			<h1 className='text-2xl font-medium pt-5 pb-3'>Tic-Tac-Toe</h1>
			{/* <FunFacts />
			<Instructions /> */}
			<PlayersForm />
			<div className='grid grid-cols-3 gap-2 p-2 border-2 border-black w-fit rounded bg-white'>
				{squares.map((item, index) => (
					<button
						key={index}
						onClick={() => handleSquareClick(index)}
						className={`${getBgClass(
							item
						)} text-white h-[80px] w-[80px] text-center  active:scale-95 transition-all duration-75 ease-in-out rounded shadow-lg`}
						disabled={winner ? true : false}
					>
						{item}
					</button>
				))}
			</div>
			{winner && (
				<p className='text-xl bg-green-500 text-white px-5 py-1'>
					Winner is: {winner === 'X' ? players.player1 : players.player2}
				</p>
			)}
			{!winner && !squares.some((el) => el === null) && (
				<p className='text-xl bg-gray-500 text-white px-5 py-1'>
					Draw! Play Again.
				</p>
			)}

			<div className='flex gap-5 flex-wrap items-center justify-center'>
				<p className='px-5 py-1 bg-green-500 text-white text-base'>
					{players.player1} wins: <span className='font-bold'> {wins.X}</span>
				</p>
				<p className='px-5 py-1 bg-red-500 text-white text-base'>
					{players.player2} wins: <span className='font-bold'> {wins.O}</span>
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
