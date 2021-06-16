import React from 'react'

export default function ValidationErrors({ errors }) {
	return (
		Object.keys(errors).length > 0 && (
			<div className="mb-4">
				<div className="font-medium text-red-500">Whoops! Something went wrong.</div>

				<ul className="mt-3 text-sm text-red-500 list-disc list-inside">
					{Object.keys(errors).map(function (key, index) {
						return <li key={index}>{errors[key]}</li>
					})}
				</ul>
			</div>
		)
	)
}
