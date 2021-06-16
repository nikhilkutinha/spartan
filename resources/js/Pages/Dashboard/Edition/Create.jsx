import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

import { useAutocomplete } from '@/hooks'
import Dashboard from '@/Layout/Dashboard'
import Autocomplete from '@/Shared/Autocomplete'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Create() {
	const {
		data: form,
		setData,
		errors,
		post,
		processing,
		transform,
	} = useForm({
		name: '',
	})

	const createEdition = (e) => {
		e.preventDefault()

		transform((data) => ({
			name: data.name,
			game_id: data.game.id,
		}))

		post(route('dashboard.editions.store'))
	}

	return (
		<Dashboard header="Create Edition">
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
									useAutocomplete(q, page, 'api.games.index')
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
                        Create edition
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
