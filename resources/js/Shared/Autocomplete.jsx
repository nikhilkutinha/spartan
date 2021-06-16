import { IconSelector } from '@tabler/icons'
import React from 'react'
import { components } from 'react-select'
import { AsyncPaginate } from 'react-select-async-paginate'

function Control({ children, isDisabled, isFocused, innerRef, innerProps }) {
	const styles = () => {
		if (isFocused) return 'border border-red-500 ring-1 ring-red-500'
		else if (isDisabled) return 'border border-gray-700 opacity-75'
		return 'border border-gray-700'
	}

	return (
		<div
			className={`relative bg-gray-800 h-[38px] flex items-center rounded text-white pl-3 pr-1 ${styles()}`}
			ref={innerRef}
			{...innerProps}
		>
			{children}
		</div>
	)
}

function SingleValue({ children }) {
	return <div className="text-sm text-white">{children}</div>
}

function DropdownIndicator() {
	return <IconSelector className="w-5 h-5 text-gray-400" />
}

function ValueContainer({ children }) {
	return (
		<div className="relative flex items-center w-full h-full overflow-hidden">
			{children}
		</div>
	)
}

function Placeholder() {
	return <span className="absolute text-sm text-gray-500">Select</span>
}

function Input({ isHidden, ...props }) {
	if (isHidden) return <components.Input {...props} />

	return <components.Input className="flex items-center" {...props} />
}

export default function Autocomplete({
	value,
	onChange,
	loadOptions,
	getOptionLabel,
}) {
	const styles = {
		input: () => {
			'flex'
		},
	}

	return (
		<div className="selector">
			<AsyncPaginate
				styles={styles}
				components={{
					Control,
					SingleValue,
					IndicatorSeparator: null,
					ClearIndicator: null,
					DropdownIndicator,
					ValueContainer,
					Placeholder,
					Input,
				}}
				additional={{ page: 1 }}
				value={value}
				isClearable
				getOptionValue={(option) => option.id}
				getOptionLabel={getOptionLabel}
				loadOptions={loadOptions}
				onChange={onChange}
				menuPortalTarget={document.body}
			/>
		</div>
	)
}
