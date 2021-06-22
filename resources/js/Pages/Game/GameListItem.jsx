import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function GameListItem({ game }) {
	const { currency } = usePage().props

	const showingPrice = () => {
		return !!(game.current_lowest_price || game.previous_lowest_price)
	}

	return (
		<InertiaLink href={route('games.show', game.id)}>
			<article className="shadow-md transform hover:-translate-y-1 transition overflow-hidden rounded-sm">
				<div className="relative bg-gray-800 aspect-w-3 aspect-h-4">
					<img
						className="absolute inset-0 object-cover"
						loading="lazy"
						src={game.poster_url}
						alt={`Poster for ${game.title}`}
					/>
				</div>

				<div className="py-3 px-4 bg-gray-800 border-t border-gray-700">
					<h5 className="text-sm text-white truncate">
						{game.title}
					</h5>
					
					<div className="mt-1">
						{showingPrice() ? 
							<span className="text-sm text-green-500">
								{currency} {game.current_lowest_price}
							</span>
							:
							<span className="text-sm text-gray-200">-</span>
						}
					</div>
				</div>
			</article>
		</InertiaLink>
	)
}
