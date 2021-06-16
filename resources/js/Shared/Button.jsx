import React from 'react'

export default function Button({
	children,
	type = 'button',
	accent = 'primary',
	className,
	...props
}) {
	const styles = () => {
		return {
			primary:
                'bg-red-500 border-transparent text-white hover:bg-red-600 focus:ring-red-500 disabled:hover:bg-red-500',
		}[accent]
	}

	return (
		<button
			type={type}
			{...props}
			className={`${styles()} ${className} inline-flex items-center px-4 font-semibold tracking-widest border border-transparent rounded py-2.5 text-xs uppercase transition focus:outline-none focus:ring focus:ring-opacity-50 disabled:opacity-75 disabled:cursor-not-allowed`}
		>
			{children}
		</button>
	)
}
