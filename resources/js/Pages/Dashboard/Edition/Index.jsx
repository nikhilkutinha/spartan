/* eslint-disable react/display-name */

import { Inertia } from '@inertiajs/inertia'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { IconPencil, IconTrash } from '@tabler/icons'
import moment from 'moment'
import React from 'react'

import { useQuery } from '@/utils'
import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Pagination from '@/Shared/Pagination'
import SearchInput from '@/Shared/SearchInput'
import Table from '@/Shared/Table'

function Header() {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-xl font-semibold text-white">Browse</h2>
			<InertiaLink href={route('dashboard.editions.create')}>
				<Button accent="primary">Create edition</Button>
			</InertiaLink>
		</div>
	)
}

export default function Index() {
	const { editions, filters } = usePage().props
	const {
		onSearch,
		filters: form,
		onSort,
		onPaginate,
		initialSortBy,
	} = useQuery({ search: '', ...filters }, route('dashboard.editions.index'))

	const columns = React.useMemo(
		() => [
			{
				Header: 'Edition',
				accessor: 'name',
			},
			{
				Header: 'Game',
				accessor: 'game.title',
				id: 'games.title',
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
				Cell: ({ row: { original: edition } }) => (
					<div className="flex items-center justify-end space-x-3">
						<button
							onClick={deleteEdition(edition.id, edition.name)}
							className="focus:outline-none"
						>
							<IconTrash className="w-5 h-5 text-gray-300" />
						</button>

						<InertiaLink
							href={route('dashboard.editions.edit', edition.id)}
						>
							<IconPencil className="w-5 h-5 text-gray-300" />
						</InertiaLink>
					</div>
				),
			},
		],
		[]
	)

	const deleteEdition = (id, identifier) => {
		return function () {
			if (confirm(`Are you sure you want to delete ${identifier}?`)) {
				Inertia.delete(route('dashboard.editions.destroy', id), {
					preserveState: false,
				})
			}
		}
	}

	return (
		<Dashboard header={Header()}>
			<div className="px-4 py-6 sm:px-0">
				<div className="mb-6 space-y-6 sm:flex sm:justify-between sm:space-y-0">
					<SearchInput value={form.search} onChange={onSearch} />

					<Pagination
						total={editions.total}
						perPage={editions.per_page}
						currentPage={editions.current_page}
						onPaginate={onPaginate}
					/>
				</div>
				<div className="overflow-auto">
					<Table
						columns={columns}
						manualSortBy={true}
						onSort={onSort}
						initialSortBy={initialSortBy}
						data={editions.data}
					/>
				</div>
			</div>
		</Dashboard>
	)
}
