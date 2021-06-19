/* eslint-disable react/jsx-key */

import { IconArrowNarrowDown } from '@tabler/icons'
import _ from 'lodash'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSortBy, useTable } from 'react-table'

export default function Table({
	columns,
	data,
	onSort,
	manualSortBy = false,
	initialSortBy = {},
}) {
	let configuration = {
		columns,
		data,
		manualSortBy,
		disableMultiSort: true,
		initialState: prepareInitialState(),
	}

	function prepareInitialState() {
		if (_.isEmpty(initialSortBy) || _.some(initialSortBy, _.isEmpty))
			return {}

		return { sortBy: [initialSortBy] }
	}

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state: { sortBy },
	} = useTable(configuration, useSortBy)

	const [isFirstSort, setIsFirstSort] = useState(true)

	useEffect(() => {
		if (!manualSortBy) return

		if (isFirstSort) {
			setIsFirstSort(false)
			return
		}

		if (!sortBy.length) {
			onSort({ sort: '', order: '' })
			return
		}

		const { id: sort, desc } = sortBy[0]
		const order = desc ? 'desc' : 'asc'

		onSort({ sort, order })
	}, [sortBy])

	return (
		<div>
			<table
				{...getTableProps()}
				className="min-w-full divide-y divide-gray-700"
			>
				<thead className="bg-gray-800">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps({
										...column.getSortByToggleProps(),
									})}
									scope="col"
									className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase whitespace-nowrap"
								>
									<div className="flex items-center w-full">
										{column.render('Header')}

										{column.isSorted && (
											<IconArrowNarrowDown
												className={`ml-1 h-4 w-4 transition transform flex-shrink-0 ${
													column.isSortedDesc
														? ''
														: 'rotate-180'
												}`}
											/>
										)}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody
					{...getTableBodyProps()}
					className="bg-gray-800 divide-y divide-gray-900"
				>
					{rows.map((row) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()} className="text-white">
								{row.cells.map((cell) => {
									return (
										<td
											className="px-6 py-3 text-sm whitespace-nowrap"
											{...cell.getCellProps()}
										>
											{cell.render('Cell')}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
