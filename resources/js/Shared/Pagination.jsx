import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import React from 'react'
import { useEffect, useMemo } from 'react'

import PaginationButton from './PaginationButton'

const RANGE_BEFORE = 1
const RANGE_AFTER = 1

export default function Pagination({
	total,
	perPage,
	currentPage = 1,
	onPaginate,
	className,
}) {
	const beforeCurrent = () => {
		return parseInt(RANGE_BEFORE)
	}

	const afterCurrent = () => {
		return parseInt(RANGE_AFTER)
	}

	const pageCount = useMemo(() => {
		return Math.ceil(total / perPage)
	}, [total, perPage])

	const hasPrev = () => {
		return currentPage > 1
	}

	const hasFirst = () => {
		return currentPage >= 2 + beforeCurrent()
	}

	const hasLast = () => {
		return currentPage <= pageCount - (1 + afterCurrent())
	}

	const hasFirstEllipsis = () => {
		return currentPage >= beforeCurrent() + 4
	}

	const hasLastEllipsis = () => {
		return currentPage < pageCount - (2 + afterCurrent())
	}

	const hasNext = () => {
		return currentPage < pageCount
	}

	const last = (event) => {
		changePage(pageCount, event)
	}

	const getPage = (num, options = {}) => {
		return {
			number: num,
			isCurrent: currentPage === num,
			click: (event) => changePage(num, event),
			disabled: options.disabled || false,
		}
	}

	const pagesInRange = () => {
		let left = Math.max(1, currentPage - beforeCurrent())
		if (left - 1 === 2) {
			left-- // Do not show the ellipsis if there is only one to hide
		}

		let right = Math.min(currentPage + afterCurrent(), pageCount)

		if (pageCount - right === 2) {
			right++ // Do not show the ellipsis if there is only one to hide
		}
		const pages = []

		for (let i = left; i <= right; i++) {
			pages.push(getPage(i))
		}
		return pages
	}

	const changePage = (num, event) => {
		if (currentPage === num || num < 1 || num > pageCount) return

		onPaginate(num)

		// Set focus on element to keep tab order
		if (event && event.target) {
			process.nextTick(() => event.target.focus())
		}
	}

	useEffect(() => {
		if (currentPage > pageCount) last()
	}, [pageCount])

	return (
		<nav className={`${className} flex items-center space-x-2`}>
			<PaginationButton
				page={getPage(currentPage - 1)}
				chevron
				disabled={!hasPrev()}
			>
				<IconChevronLeft className="w-4 h-4 text-gray-500" />
			</PaginationButton>

			{hasFirst() && <PaginationButton page={getPage(1)} />}

			{hasFirstEllipsis() && <span>&hellip;</span>}

			{pagesInRange().map((page) => {
				return <PaginationButton key={page.number} page={page} />
			})}

			{hasLastEllipsis() && <span>&hellip;</span>}

			{hasLast() && <PaginationButton page={getPage(pageCount)} />}

			<PaginationButton
				page={getPage(currentPage + 1)}
				chevron
				disabled={!hasNext()}
			>
				<IconChevronRight className="w-4 h-4 text-gray-500" />
			</PaginationButton>
		</nav>
	)
}
