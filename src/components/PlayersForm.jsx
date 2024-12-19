import { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';

const PlayersForm = () => {
	const { players, setPlayers } = useContext(GameContext);

	useEffect(() => {
		console.log(players);
	}, [players]);

	const handleChange = (e) => {
		const value = e.target.value;
		const key = e.target.name;

		setPlayers((prevPlayers) => ({
			...prevPlayers,
			[key]: value,
		}));
	};

	return (
		<div className='flex gap-5'>
			<div className='flex flex-col gap-2'>
				<label className='text-sm tracking-wide'>NamePlayer1</label>
				<input
					type='text'
					value={players.player1}
					name='player1'
					className=' max-w-[350px] px-3 py-1 outline-none border border-black rounded'
					onChange={handleChange}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<label className='text-sm tracking-wide'>NamePlayer2</label>
				<input
					type='text'
					value={players.player2}
					name='player2'
					className=' max-w-[350px] px-3 py-1 outline-none border border-black rounded'
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default PlayersForm;
