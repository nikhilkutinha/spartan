import React from 'react'

export default function Alert({ children, accent = 'primary' }) {
	const styles = () => {
		return {
			primary: 'bg-red-500 text-white',
			warning: 'bg-yellow-500 text-white',
		}[accent]
	}

	return (
		<div className={`${styles()} text-sm flex p-4 rounded`}>{children}</div>
	)
}
