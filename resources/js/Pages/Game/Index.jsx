import { usePage } from '@inertiajs/inertia-react'
import React from 'react'

import { useQuery } from '@/hooks'
import Default from '@/Layout/Default'
import Pagination from '@/Shared/Pagination'

import GameList from './GameList'

export default function Index() {
	const { games, filters } = usePage().props

	const { onPaginate } = useQuery({ ...filters })

	return (
		<Default
			header={
				<h2 className="text-xl font-semibold text-white">Browse</h2>
			}
		>
			<div className="container px-2 py-8 mx-auto sm:px-6 lg:px-8">
				{games.next_page_url && (
					<div className="flex justify-end mb-6">
						<Pagination
							total={games.total}
							perPage={games.per_page}
							currentPage={games.current_page}
							onPaginate={onPaginate}
						/>
					</div>
				)}

				<GameList games={games.data} />
			</div>
		</Default>
	)
}
