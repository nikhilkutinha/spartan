import React from 'react'

export default function PaginationButton({
	children,
	page,
	disabled,
	chevron,
}) {
	const isDisabled = () => {
		return disabled || page.disabled
	}

	const styles = () => {
		if (page.isCurrent && !isDisabled() && !chevron)
			return 'bg-red-500 border-red-500'
		return 'border-gray-700'
	}

	return (
		<button
			disabled={isDisabled()}
			type="button"
			className={`${styles()} disabled:cursor-not-allowed inline-flex items-center text-white justify-around p-2 h-[38px] w-[38px] min-w-max rounded focus:outline-none border`}
			onClick={page.click}
		>
			{children ? children : page.number}
		</button>
	)
}
