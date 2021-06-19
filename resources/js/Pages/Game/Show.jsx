/* eslint-disable react/display-name */

import { usePage } from '@inertiajs/inertia-react'
import { IconLink } from '@tabler/icons'
import moment from 'moment'
import React from 'react'

import { useQuery } from '@/utils'
import Default from '@/Layout/Default'
import Alert from '@/Shared/Alert'
import Field from '@/Shared/Field'
import Select from '@/Shared/Form/Select'
import Table from '@/Shared/Table'

export default function Show() {
	const { game, edition, currency, filters } = usePage().props

	const getLowestCurrentPrice = () => {
		return Math.min(...game.offers.map((user) => user.current_price))
	}

	const getLowestHistoricPrice = () => {
		return Math.min(...game.offers.map((user) => user.lowest_price))
	}

	const { filters: form, setFilters } = useQuery(
		{ ...filters, edition: edition || '' },
		route('games.show', game.id)
	)

	const columns = React.useMemo(
		() => [
			{
				Header: 'Vendor',
				accessor: 'vendor.name',
				width: 100,
				Cell: ({ row: { original: offer } }) => (
					<div className="flex items-center">
						<a href={offer.url} target="_blank" rel="noreferrer">
							<IconLink className="w-5 h-5 text-gray-300" />
						</a>
						<span className="ml-3">{offer.vendor.name}</span>
					</div>
				),
			},
			{
				Header: 'Current price',
				accessor: 'current_price',
				Cell: ({ row: { original: offer } }) => {
					return (
						<>
							{offer.current_price == getLowestCurrentPrice() ? (
								<span className="text-orange-500">
									{currency} {offer.current_price}
								</span>
							) : (
								<span>
									{currency} {offer.current_price}
								</span>
							)}
						</>
					)
				},
			},
			{
				Header: 'Lowest price',
				accessor: 'lowest_price',
				Cell: ({ row: { original: offer } }) => {
					return (
						<>
							{offer.lowest_price == getLowestHistoricPrice() ? (
								<span className="text-blue-500">
									{currency} {offer.lowest_price}
								</span>
							) : (
								<span>
									{currency} {offer.lowest_price}
								</span>
							)}
						</>
					)
				},
			},
		],
		[getLowestHistoricPrice, getLowestCurrentPrice]
	)

	return (
		<Default
			header={
				<h2 className="text-xl font-semibold text-white">
					{game.title}
				</h2>
			}
		>
			<div className="relative">
				<div
					className="absolute inset-0 bg-center bg-no-repeat bg-cover h-[36rem] z-[-10]"
					style={{ backgroundImage: `url(${game.backdrop_url})` }}
				></div>

				<div className="absolute inset-0 z-10 bg-gray-900 h-[36rem] bg-gradient-to-t from-gray-900 bg-opacity-75 backdrop-filter backdrop-blur"></div>

				<div className="relative z-10 h-full min-h-[36rem]">
					<div className="container px-4 py-10 mx-auto sm:px-6 lg:px-8">
						<div className="grid grid-cols-12 gap-8">
							<div className="col-span-12 xl:col-span-3">
								<div className="max-w-xs">
									<figure className="relative bg-gray-800 shadow-lg aspect-w-3 aspect-h-4">
										<img
											className="absolute inset-0 object-cover"
											loading="lazy"
											src={game.poster_url}
											alt={`Poster for ${game.title}`}
										/>
									</figure>
								</div>
							</div>

							<div className="col-span-12 xl:col-span-9">
								<div className="space-y-4">
									<h2 className="text-xl font-semibold text-white">
										{game.title}
									</h2>
									<div className="flex items-center text-true-gray-400 space-x-3">
										<span>
											{moment(game.released_on).format(
												'MMM Do, YYYY'
											)}
										</span>

										{game.genres && (
											<>
												<span className="text-xs">
                                                    •
												</span>
												<span>
													{game.genres.join(', ')}
												</span>
											</>
										)}
									</div>
								</div>

								<hr className="my-6 border-gray-700 border-b-0.5" />

								<div className="space-y-4">
									<div className="max-w-4xl">
										<p
											className="text-gray-200 line-clamp-3 leading-relaxed"
											title={game.description}
										>
											{game.description}
										</p>
									</div>

									{game.platforms && (
										<div className="flex">
											<span className="mr-2 text-true-gray-400">
                                                Platforms:
											</span>
											<p className="text-gray-200">
												{game.platforms.join(', ')}
											</p>
										</div>
									)}

									{game.editions.length > 0 && 
										<Field
											htmlFor="edition"
											label="Edition"
											className="sm:w-1/3"
										>
											<Select
												value={form.edition}
												onChange={(e) => {
													setFilters({
														...form,
														edition: e.target.value,
													})
												}}
											>
												{game.editions.map(
													(edition) => (
														<option
															key={edition.id}
															value={edition.id}
														>
															{edition.name}
														</option>
													)
												)}
											</Select>
										</Field>
									}
								</div>
							</div>
						</div>

						<div className="mt-10">
							{game.offers.length ? (
								<div className="overflow-x-auto">
									<Table
										columns={columns}
										data={game.offers}
									/>
								</div>
							) : (
								<Alert accent={'warning'}>
                                    There are currently no offers available for
                                    this game or edition.
								</Alert>
							)}
						</div>
					</div>
				</div>
			</div>
		</Default>
	)
}
