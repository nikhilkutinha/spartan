import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'

import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'
import Textarea from '@/Shared/Textarea'

export default function Edit() {
	const { game } = usePage().props

	const {
		data: form,
		setData,
		errors,
		put,
		processing,
	} = useForm({
		igdb_url: game.igdb_url || '',
		title: game.title || '',
		description: game.description || '',
		released_on: game.released_on || '',
		poster_path: game.poster_url || '',
		backdrop_path: game.backdrop_url || '',
	})

	const editGame = (e) => {
		e.preventDefault()
		put(route('dashboard.games.update', game.id))
	}

	return (
		<Dashboard header="Edit Game">
			<FormSection
				title="Primary Information"
				description="
                        Please ensure that the information you are about to add is valid
                        and reliable."
			>
				<form className="space-y-6" onSubmit={editGame}>
					<div className="grid grid-cols-4 gap-4">
						<Field
							htmlFor="title"
							label="Title"
							className="col-span-4 xl:col-span-2"
						>
							<Input
								name="title"
								error={errors.title}
								value={form.title}
								// required
								autoComplete="off"
								onChange={(e) =>
									setData('title', e.target.value)
								}
							/>
						</Field>
						<Field
							htmlFor="released_on"
							label="Release date"
							className="col-span-4 xl:col-span-2"
						>
							<Input
								name="released_on"
								error={errors.released_on}
								value={form.released_on}
								required
								type="date"
								autoComplete="off"
								onChange={(e) =>
									setData('released_on', e.target.value)
								}
							/>
						</Field>
						<Field
							htmlFor="description"
							label="Release date"
							className="col-span-4"
						>
							<Textarea
								name="description"
								error={errors.description}
								rows="6"
								required
								onChange={(e) =>
									setData('description', e.target.value)
								}
							>
								{form.description}
							</Textarea>
						</Field>
						<Field
							htmlFor="poster"
							label="Poster URL"
							className="col-span-4 xl:col-span-2"
						>
							<Input
								name="poster"
								error={errors.poster_path}
								value={form.poster_path}
								required
								type="url"
								autoComplete="off"
								onChange={(e) =>
									setData('poster_path', e.target.value)
								}
							/>
						</Field>
						<Field
							htmlFor="backdrop"
							label="Backdrop URL"
							className="col-span-4 xl:col-span-2"
						>
							<Input
								name="backdrop"
								error={errors.backdrop_path}
								value={form.backdrop_path}
								required
								type="url"
								autoComplete="off"
								onChange={(e) =>
									setData('backdrop_path', e.target.value)
								}
							/>
						</Field>
					</div>
					<Button type="submit" disabled={processing}>
                        Edit game
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
