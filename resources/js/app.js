import './bootstrap'

import { App } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import React from 'react'
import { render } from 'react-dom'


InertiaProgress.init({
	color: '#EF4444',
})

const el = document.getElementById('app')

render(
	<App
		initialPage={JSON.parse(el.dataset.page)}
		resolveComponent={name => require(`./Pages/${name}`).default}
	/>,
	el
)