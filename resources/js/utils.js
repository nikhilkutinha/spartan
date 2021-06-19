import { Inertia } from '@inertiajs/inertia'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { usePrevious } from 'react-use'

export function useQuery(initialFilters, url) {
	const [filters, setFilters] = useState({
		search: '',
		page: '',
		sort: '',
		order: '',
		...initialFilters,
	})

	const initialSortBy = {
		id: filters.sort,
		desc: filters.order === 'desc' ? true : false,
	}

	const previousFilters = usePrevious(filters)

	useEffect(() => {
		if (previousFilters) {
			const query = Object.keys(_.pickBy(filters)).length
				? _.pickBy(filters)
				: ''

			Inertia.get(url, query, {
				replace: true,
				preserveState: true,
				preserveScroll: true,
			})
		}
	}, [filters])

	const onSearch = (e) => {
		setFilters((filters) => ({
			...filters,
			search: e.target.value,
		}))
	}

	const onPaginate = (page) => {
		setFilters((filters) => ({
			...filters,
			page,
		}))
	}

	const onSort = ({ sort, order }) => {
		setFilters((filters) => ({
			...filters,
			sort,
			order,
		}))
	}

	return {
		onSearch,
		onPaginate,
		onSort,
		setFilters,
		filters,
		initialSortBy,
	}
}

export async function useAutocomplete(search, page, routeName) {
	const response = await fetch(route(routeName, { search }))

	const jsonized = await response.json()

	return {
		options: jsonized.data,
		hasMore: false,
		additional: {
			page: page + 1,
		},
	}
}
