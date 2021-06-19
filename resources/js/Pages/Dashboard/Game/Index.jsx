/* eslint-disable react/display-name */

import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { IconChevronDown,IconEye, IconPencil, IconTrash } from '@tabler/icons'
import moment from 'moment'
import React from 'react'

import { useQuery } from '@/utils'
import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Dropdown from '@/Shared/Dropdown'
import Pagination from '@/Shared/Pagination'
import SearchInput from '@/Shared/SearchInput'
import Table from '@/Shared/Table'

function Header() {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-xl font-semibold text-white">Browse</h2>			
				
			<Dropdown>
				<Dropdown.Trigger>
					<Button accent="primary">
						<div className="flex items-center">
							Create Game
							<IconChevronDown className="w-4 h-4 ml-3" />
						</div>
					</Button>
				</Dropdown.Trigger>

				<Dropdown.Content>
					<Dropdown.Link href={route('dashboard.games.create')}>
						Automatic
					</Dropdown.Link>
				</Dropdown.Content>
			</Dropdown>
		</div>
	)
}

export default function Index() {
	const { games, filters } = usePage().props

	const {
		onSearch,
		onSort,
		initialSortBy,
		filters: query,
		onPaginate,
	} = useQuery(filters, route('dashboard.games.index'))

	const columns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
			},
			{
				Header: 'Released on',
				accessor: 'released_on',
				Cell: ({ cell: { value } }) => (
					<>{moment(value).format('MMM Do, YYYY')}</>
				),
			},
			{
				Header: 'Created at',
				accessor: 'created_at',
				Cell: ({ cell: { value } }) => (
					<>{moment(value).format('MMM Do, YYYY')}</>
				),
			},
			{
				Header: () => <div className="w-full text-right">Actions</div>,
				accessor: 'actions',
				disableSortBy: true,
				Cell: ({ row: { original: game } }) => (
					<div className="flex items-center justify-end space-x-3">
						<InertiaLink
							href={route('dashboard.games.edit', game.id)}
						>
							<IconPencil className="w-5 h-5 text-gray-300" />
						</InertiaLink>

						<button
							onClick={deleteGame(game.id, game.title)}
							className="focus:outline-none"
						>
							<IconTrash className="w-5 h-5 text-gray-300" />
						</button>

						<InertiaLink href={route('games.show', game.id)}>
							<IconEye className="w-5 h-5 text-gray-300" />
						</InertiaLink>
					</div>
				),
			},
		],
		[]
	)

	const deleteGame = (id, identifier) => {
		return function () {
			if (confirm(`Are you sure you want to delete ${identifier}?`)) {
				Inertia.delete(route('dashboard.games.destroy', id), {
					preserveState: false,
				})
			}
		}
	}

	return (
		<Dashboard header={Header()}>
			<div className="px-4 py-6 sm:px-0">
				<div className="mb-6 space-y-6 sm:flex sm:justify-between sm:space-y-0">
					<SearchInput value={query.search} onChange={onSearch} />

					<Pagination
						total={games.total}
						perPage={games.per_page}
						currentPage={games.current_page}
						onPaginate={onPaginate}
					/>
				</div>

				<div className="overflow-auto">
					<Table
						columns={columns}
						data={games.data}
						manualSortBy={true}
						initialSortBy={initialSortBy}
						onSort={onSort}
					/>
				</div>
			</div>
		</Dashboard>
	)
}
