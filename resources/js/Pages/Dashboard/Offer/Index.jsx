/* eslint-disable react/display-name */

import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { IconLink, IconPencil, IconTrash } from '@tabler/icons'
import moment from 'moment'
import React from 'react'

import { nullFormatter } from '@/helpers'
import { useQuery } from '@/hooks'
import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Pagination from '@/Shared/Pagination'
import SearchInput from '@/Shared/SearchInput'
import Table from '@/Shared/Table'

function Header() {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-xl font-semibold text-white">Browse</h2>
			<InertiaLink href={route('dashboard.offers.create')}>
				<Button accent="primary">Create offer</Button>
			</InertiaLink>
		</div>
	)
}

export default function Index() {
	const { offers, filters, currency } = usePage().props

	const {
		onSearch,
		filters: form,
		onPaginate,
		onSort,
		initialSortBy
	} = useQuery({ search: '', ...filters }, route('dashboard.offers.index'))

	// const data = React.useMemo(() => offers.data, []);
	const columns = React.useMemo(
		() => [
			{
				Header: 'Vendor',
				accessor: 'vendor.name',
				id: 'vendors.name',
			},
			{
				Header: 'Game',
				accessor: 'game.title',
				id: 'games.title',
			},
			{
				Header: 'Edition',
				accessor: 'edition.name',
				id: 'editions.id',
				Cell: nullFormatter,
			},
			{
				Header: 'Current price',
				accessor: 'current_price',
				Cell: ({ cell: { value } }) => (
					<>
						{value ? (
							<span>
								{currency} {value}
							</span>
						) : (
							'-'
						)}
					</>
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
				Cell: ({ row: { original: offer } }) => (
					<div className="flex items-center justify-end space-x-3">
						<a href={offer.url} target="_blank" rel="noreferrer">
							<IconLink className="w-5 h-5 text-gray-300" />
						</a>

						<button
							onClick={deleteOffer(offer.id, offer.game.title)}
							className="focus:outline-none"
						>
							<IconTrash className="w-5 h-5 text-gray-300" />
						</button>

						<InertiaLink
							href={route('dashboard.offers.edit', offer.id)}
						>
							<IconPencil className="w-5 h-5 text-gray-300" />
						</InertiaLink>
					</div>
				),
			},
		],
		[]
	)

	const deleteOffer = (id, identifier) => {
		return function () {
			if (
				confirm(
					`Are you sure you want to delete offer for ${identifier}?`
				)
			) {
				Inertia.delete(route('dashboard.offers.destroy', id), {
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
						total={offers.total}
						perPage={offers.per_page}
						currentPage={offers.current_page}
						onPaginate={onPaginate}
					/>
				</div>
				<div className="overflow-auto">
					<Table
						columns={columns}
						manualSortBy={true}
						data={offers.data}
						initialSortBy={initialSortBy}
						onSort={onSort}
					/>
				</div>
			</div>
		</Dashboard>
	)
}
