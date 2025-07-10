import deskTemplate from '@/assets/desk.png'
import { Button } from '@/components/ui/button'
import useSettingsStore from '@/stores/settings-store'
import html2canvas from 'html2canvas-pro'
import { DownloadIcon } from 'lucide-react'
import { Reorder } from 'motion/react'
import { useRef } from 'react'

const borderColors = {
	white: 'white',
	black: 'black',
	wood: 'brown',
}

const Preview = () => {
	const { wallColor, arts, setArts, gap, border, borderColor } = useSettingsStore()
	const previewRef = useRef<HTMLDivElement>(null)

	const handleDownload = async () => {
		if (!previewRef.current) return
		const canvas = await html2canvas(previewRef.current, { useCORS: true })
		const link = document.createElement('a')
		link.download = 'preview.png'
		link.href = canvas.toDataURL()
		link.click()
	}

	return (
		<div
			ref={previewRef}
			className="h-full flex-col items-center justify-center relative"
			style={{ backgroundColor: wallColor }}
		>
			<Button
				onClick={handleDownload}
				className="absolute top-4 right-4"
				variant="outline"
				size="icon"
			>
				<DownloadIcon />
			</Button>
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
