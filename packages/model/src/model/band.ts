
export interface Band {
	name: string
	members: Member[]
}

export type Instrument = 'Guitar' | 'Bass' | 'Drums' | 'Vocals'

export interface Member {
	name: string
	email: string
	phone?: string
	instrument: Instrument
}

const defaultInstrument: Instrument = 'Guitar'
