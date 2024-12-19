const FunFacts = () => {
	const funFacts = [
		'Did you know: Tic-Tac-Toe is also called Noughts and Crosses?',
		'Tic-Tac-Toe is a game of strategy and can be solved using game theory!',
		'The game dates back to ancient Egypt, over 3000 years ago.',
	];

	const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

	return (
		<div className='fact-section'>
			<p className='text-base'>{randomFact}</p>
		</div>
	);
};

export default FunFacts;
