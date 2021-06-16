import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'
// import { useMemo } from 'react'
// import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons";

export default function GameListItem({ game }) {
	const { currency } = usePage().props

	// const getPercentageDiff = (now, original) => {
	// 	return ((now - original) / original) * 100
	// }

	// const delta = useMemo(() => {
	// 	const diff = getPercentageDiff(
	// 		game.current_lowest_price,
	// 		game.previous_lowest_price
	// 	)
	// 	return Math.round((diff + Number.EPSILON) * 100) / 100
	// })

	const showingPrice = () => {
		return !!(game.current_lowest_price || game.previous_lowest_price)
	}

	return (
		<InertiaLink href={route('games.show', game.id)}>
			<article className="shadow-md transform hover:-translate-y-1 transition">
				<div className="p-3 bg-gray-800">
					<h5 className="text-sm text-white truncate">
						{game.title}
					</h5>
				</div>
				<div className="relative bg-gray-800 aspect-w-3 aspect-h-4">
					<img
						className="absolute inset-0 object-cover"
						loading="lazy"
						src={game.poster_url}
						alt={`Poster for ${game.title}`}
					/>
				</div>
				<div className="flex items-center justify-between p-3 bg-gray-800">
					{showingPrice() ? (
						<>
							<span className="text-sm text-white">
								{currency} {game.current_lowest_price}
							</span>

							{/* {delta <= 0 ? (
                                <div className="flex items-center text-green-500 ">
                                    <IconArrowDownLeft className="h-3" />
                                    <span className="text-xs">
                                        {Math.abs(delta)} %
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center text-red-500 ">
                                    <IconArrowUpRight className="h-3" />
                                    <span className="text-xs">
                                        {Math.abs(delta)} %
                                    </span>
                                </div>
                            )} */}
						</>
					) : (
						<span className="text-sm text-gray-200">-</span>
					)}
				</div>
			</article>
		</InertiaLink>
	)
}
