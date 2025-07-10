import deskTemplate from '@/assets/desk.png'
import useSettingsStore from '@/stores/settings-store'
import { Reorder } from 'motion/react'

const borderColors = {
	white: 'white',
	black: 'black',
	wood: 'brown',
}

const Preview = () => {
	const { wallColor, arts, setArts, gap, border, borderColor } = useSettingsStore()
	return (
		<div
			className="h-full flex-col items-center justify-center"
			style={{ backgroundColor: wallColor }}
		>
			<Reorder.Group
				as="div"
				axis="x"
				values={arts}
				onReorder={newOrder =>
					setArts(arts.map(art => ({ ...art, order: newOrder.findIndex(a => a.id === art.id) })))
				}
				className="h-2/3 w-full flex flex-wrap justify-center items-center"
				style={{ gap: `${gap}px` }}
			>
				{arts
					.filter(art => art.active)
					.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
					.map(art => (
						<Reorder.Item
							as="img"
							value={art}
							src={art.url}
							alt={art.id}
							className="h-[300px] w-auto"
							key={art.id}
							style={{ border: border ? `5px solid ${borderColors[borderColor]}` : 'none' }}
						/>
					))}
			</Reorder.Group>
			<div className="h-1/3 w-full overflow-clip">
				<img src={deskTemplate} alt="desk template" className="w-[700px] mx-auto" />
			</div>
		</div>
	)
}

export default Preview
