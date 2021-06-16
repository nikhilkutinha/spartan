import React from 'react'

export default function Select({ children, error, className, ...props }) {
	const styles = () => {
		return `${className} ${error ? 'border-red-500' : ''}`
	}

	return (
		<>
			<select
				{...props}
				className={`${styles()} border border-gray-700 bg-gray-800 focus:ring-red-500 focus:border-red-500 flex-1 block w-full rounded sm:text-sm text-white`}
			>
				{children}
			</select>

			{error && <p className="text-sm text-red-500 mt-1.5">{error}</p>}
		</>
	)
}
