import { usePage } from '@inertiajs/inertia-react'
import React from 'react'

import { useQuery } from '@/utils'
import Default from '@/Layout/Default'
import Pagination from '@/Shared/Pagination'
import SearchInput from '@/Shared/SearchInput'

import GameList from './GameList'

export default function Index() {
	const { games, filters } = usePage().props

	const { onPaginate, onSearch } = useQuery({ ...filters }, route('home'))

	return (
		<Default
			header={
				<h2 className="text-xl font-semibold text-white">Browse</h2>
			}
		>
			<div className="container px-2 py-8 mx-auto sm:px-6 lg:px-8">
				
			
				<div className="space-y-6 sm:flex sm:justify-between sm:space-y-0 mb-6">
					<SearchInput onChange={onSearch} />
					
					<Pagination
						total={games.total}
						perPage={games.per_page}
						currentPage={games.current_page}
						onPaginate={onPaginate}
					/>

				</div>
				

				<GameList games={games.data} />
			</div>
		</Default>
	)
}
