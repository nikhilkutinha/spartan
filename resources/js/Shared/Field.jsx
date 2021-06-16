import React, { isValidElement } from 'react'

export default function Field({ children, label, htmlFor, className, help, error }) {
	return (
		<div className={className}>
			{isValidElement(label) ?
				{ label } 
				:
				<label 
					htmlFor={htmlFor}
					className="block text-sm font-medium text-gray-200 mb-1.5"
				>
					{label}
				</label>
			}
			{children}

			{error && <p className="text-sm text-red-500 mt-1.5">{error}</p>}
			
			{help && <p className="text-sm text-gray-400 mt-1.5">{help}</p>}
		</div>
	)
}
