import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

import { useAutocomplete } from '@/hooks'
import Dashboard from '@/Layout/Dashboard'
import Autocomplete from '@/Shared/Autocomplete'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import Select from '@/Shared/Form/Select'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Create() {
	const {
		data: form,
		errors,
		processing,
		setData,
		post,
		transform,
	} = useForm({
		vendor: '',
		game: '',
		edition_id: '',
		url: '',
	})

	const createOffer = (e) => {
		e.preventDefault()

		transform((data) => ({
			url: data.url,
			edition_id: data.edition_id,
			game_id: data.game.id,
			vendor_id: data.vendor.id,
		}))

		post(route('dashboard.offers.store'))
	}

	return (
		<Dashboard header={'Create Offer'}>
			<FormSection
				title="Offer Information"
				description="Please ensure that the information you're about to add is valid and reliable."
			>
				<form className="space-y-6" onSubmit={createOffer}>
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

						{form.game.editions?.length > 0 && (
							<Field
								htmlFor="edition"
								label="Edition"
								className="col-span-3 sm:col-span-2"
							>
								<Select
									value={form.edition_id}
									onChange={(e) =>
										setData('edition_id', e.target.value)
									}
									error={errors.edition_id}
									required
								>
									<option value="" disabled>
                                        ---
									</option>
									{form.game.editions.map((edition) => (
										<option
											key={edition.id}
											value={edition.id}
										>
											{edition.name}
										</option>
									))}
								</Select>
							</Field>
						)}

						<Field
							htmlFor="vendor"
							label="Vendor"
							className="col-span-3 sm:col-span-2"
						>
							<Autocomplete
								value={form.vendor}
								loadOptions={(q, { page }) =>
									useAutocomplete(
										q,
										page,
										'api.vendors.index'
									)
								}
								getOptionLabel={(option) => option.name}
								onChange={(value) => setData('vendor', value)}
							/>
						</Field>

						<Field
							htmlFor="url"
							label="URL"
							className="col-span-3 sm:col-span-2"
						>
							<Input
								value={form.url}
								onChange={(e) => setData('url', e.target.value)}
								error={errors.url}
							/>
						</Field>
					</div>

					<Button type="submit" disabled={processing}>
                        Create Offer
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
