import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SettingsStoreState = {
	wallColor: string
	arts: Art[]
	gap: number
	border: boolean
	borderColor: 'white' | 'black' | 'wood'
}

type SettingsStoreActions = {
	setWallColor: (newWallColor: SettingsStoreState['wallColor']) => void
	setArts: (newArts: SettingsStoreState['arts']) => void
	setGap: (newGap: SettingsStoreState['gap']) => void
	setBorder: (newBorder: SettingsStoreState['border']) => void
	setBorderColor: (newBorderColor: SettingsStoreState['borderColor']) => void
}

type SettingsStore = SettingsStoreState & SettingsStoreActions

const useSettingsStore = create<SettingsStore>()(
	persist(
		set => ({
			wallColor: '#E6CB6B',
			arts: [],
			gap: 10,
			border: false,
			borderColor: 'black',
			setWallColor: (color: string) => set({ wallColor: color }),
			setArts: (arts: Art[]) => set({ arts }),
			setGap: (gap: number) => set({ gap }),
			setBorder: (border: boolean) => set({ border }),
			setBorderColor: (color: 'white' | 'black' | 'wood') => set({ borderColor: color }),
		}),
		{
			name: 'settings',
		},
	),
)
export default useSettingsStore
