import { IconSearch } from '@tabler/icons'
import React from 'react'

import Input from '@/Shared/Input'

export default function SearchInput({ onChange, value }) {
	return (
		<div className="relative flex items-center">
			<Input
				type="text"
				placeholder="Search"
				name="q"
				value={value}
				className="pr-9"
				onChange={onChange}
			/>

			<IconSearch className="absolute w-4 h-4 text-gray-500 right-2.5" />
		</div>
	)
}
