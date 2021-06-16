import React from 'react'
import { useEffect,useRef } from 'react'

export default function Input({ type = 'text', className, isFocused, isInvalid, ...props }) {
	const styles = () => {
		return `${className} ${isInvalid ? 'border-red-500' : 'border-gray-700'}`
	}

	const input = useRef()

	useEffect(() => {
		if (isFocused) {
			input.current.focus()
		}
	}, [])

	return (
		<>
			<input
				{...props}
				type={type}
				ref={input}
				className={`${styles()} border bg-gray-800 focus:ring-red-500 focus:border-red-500 flex-1 block w-full rounded sm:text-sm text-white`}
			/>
		</>
	)
}
