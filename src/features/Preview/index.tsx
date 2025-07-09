import deskTemplate from '@/assets/desk.png'
import useSettingsStore from '@/stores/settings-store'

const borderColors = {
	white: 'white',
	black: 'black',
	wood: 'brown',
}

const Preview = () => {
	const { wallColor, arts, gap, border, borderColor } = useSettingsStore()
	return (
		<div
			className="h-full flex-col items-center justify-center"
			style={{ backgroundColor: wallColor }}
		>
			<div
				className="h-2/3 w-full flex flex-wrap justify-center items-center"
				style={{ gap: `${gap}px` }}
			>
				{arts.map(art => (
					<img
						src={art.url}
						alt={art.id}
						className="h-[300px] w-auto"
						key={art.id}
						style={{ border: border ? `5px solid ${borderColors[borderColor]}` : 'none' }}
					/>
				))}
			</div>
			<div className="h-1/3 w-full overflow-clip">
				<img src={deskTemplate} alt="desk template" className="w-[700px] mx-auto" />
			</div>
		</div>
	)
}

export default Preview
