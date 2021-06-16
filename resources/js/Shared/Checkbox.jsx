import React from 'react'

export default function Checkbox(props) {
	return (
		<input
			type="checkbox"
			{...props}
			className="w-4 h-4 text-red-500 bg-gray-800 border-gray-700 rounded-sm focus:ring-red-500 focus:ring-offset-gray-800"
		/>
	)
}
