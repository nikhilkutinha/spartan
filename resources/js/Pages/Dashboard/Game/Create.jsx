import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

import Dashboard from '@/Layout/Dashboard'
import Button from '@/Shared/Button'
import Field from '@/Shared/Field'
import FormSection from '@/Shared/FormSection'
import Input from '@/Shared/Input'

export default function Create() {
	const { data, setData, errors, post, processing } = useForm({
		igdb_url: '',
	})

	const createGame = (e) => {
		e.preventDefault()
		post(route('dashboard.games.store'))
	}

	return (
		<Dashboard header="Create Game">
			<FormSection
				title="External Identification"
				description={
					<>
                        Please add in the Internet Game Database (
						<a
							className="text-red-500"
							href="//igdb.com"
							target="_blank"
							rel="noreferrer"
						>
                            IGDB
						</a>
                        ) URL of the game you would like to add. We&apos;ll
                        automatically collect information and add the game to
                        our database. You may modify the autofilled information
                        later.
					</>
				}
			>
				<form className="space-y-6" onSubmit={createGame}>
					<div className="grid grid-cols-3">
						<Field
							htmlFor="igdb_url"
							label="IGDB URL"
							className="col-span-3 sm:col-span-2"
						>
							<Input
								name="igdb_url"
								error={errors.igdb_url}
								value={data.igdb_url}
								required
								autoComplete="off"
								placeholder="Select"
								onChange={(e) =>
									setData('igdb_url', e.target.value)
								}
							/>
						</Field>
					</div>

					<Button type="submit" disabled={processing}>
                        Create game
					</Button>
				</form>
			</FormSection>
		</Dashboard>
	)
}
