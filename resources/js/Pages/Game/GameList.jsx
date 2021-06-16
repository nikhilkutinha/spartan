import React from 'react'

import GameListItem from './GameListItem'

export default function GameList({ games }) {
	return (
		<div className="grid grid-cols-10 gap-3 lg:gap-6">
			{games.map((game) => (
				<div
					key={game.id}
					className="col-span-6 md:col-span-4 xl:col-span-2"
				>
					<GameListItem game={game} />
				</div>
			))}
		</div>
	)
}
