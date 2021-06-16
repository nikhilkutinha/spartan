import { isEmpty } from 'lodash'

export const nullFormatter = ({ cell: { value } }) => {
	return isEmpty(value) ? '-' : value
}