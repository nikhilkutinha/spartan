import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'

import Dashboard from '@/Layout/Dashboard'
import Autocomplete from '@/Shared/Autocomplete'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Edit() {
	const { edition } = usePage().props

	const {
		data: form,
		setData,
		errors,
		put,
		processing,
		transform,
	} = useForm({
		name: edition.name,
		game: edition.game,
	})

	const createEdition = (e) => {
		e.preventDefault()

		transform((data) => ({
			name: data.name,
			game_id: data.game.id,
		}))

		put(route('dashboard.editions.update', edition.id))
	}

	const loadAsyncGames = async (q, { page }) => {
		const response = await fetch(`/api/games?search=${q}`)

		const jsonized = await response.json()

		return {
			options: jsonized.data,
			hasMore: false,
			additional: {
				page: page + 1,
			},
		}
	}

	return (
		<Dashboard header="Edit Edition">
			<FormSection
				title="Edition Information"
				description={<>Please ensure that your information is valid.</>}
			>
				<form className="space-y-6" onSubmit={createEdition}>
					<div className="grid grid-cols-3 gap-4">
						<Field
							htmlFor="game"
							label="Game"
							className="col-span-3 sm:col-span-2"
						>
							<Autocomplete
								value={form.game}
								loadOptions={(q, { page }) =>
									loadAsyncGames(q, { page })
								}
								getOptionLabel={(option) => option.title}
								onChange={(value) => setData('game', value)}
							/>
						</Field>

						<Field
							htmlFor="name"
							label="Name"
							className="col-span-3 xl:col-span-2"
						>
							<Input
								name="name"
								error={errors.name}
								value={form.name}
								required
								autoComplete="off"
								onChange={(e) =>
									setData('name', e.target.value)
								}
							/>
						</Field>
					</div>

					<Button type="submit" disabled={processing}>
                        Edit edition
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
