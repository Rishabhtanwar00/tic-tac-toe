const Instructions = () => {
	return (
		<div className='instructions'>
			<h3 className='text-2xl font-semibold text-white'>How to Play</h3>
			<ul className='text-lg'>
				<li>Click on an empty square to place your mark.</li>
				<li>The first player to get three of their marks in a row wins!</li>
				<li>Player 1 uses "X", Player 2 uses "O".</li>
			</ul>
		</div>
	);
};

export default Instructions;
