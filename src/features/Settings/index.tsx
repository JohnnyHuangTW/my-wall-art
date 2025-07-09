import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import useSettingsStore from '@/stores/settings-store'
import { useState } from 'react'

const Settings = () => {
	const {
		wallColor,
		setWallColor,
		border,
		setBorder,
		borderColor,
		setBorderColor,
		gap,
		setGap,
		arts,
		setArts,
	} = useSettingsStore()

	const [art, setArt] = useState<string>('')

	const handleAddArt = () => {
		if (art) {
			setArts([...arts, { id: Date.now().toString(), url: art, active: true }])
			setArt('')
		}
	}

	const handleRemoveArt = (id: string) => {
		setArts(arts.filter(art => art.id !== id))
	}

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
			<div className="space-y-6">
				<div className="flex items-center gap-2">
					<Label>Wall Color</Label>
					<input
						type="color"
						className="size-6"
						value={wallColor}
						onChange={e => setWallColor(e.target.value)}
					/>
				</div>

				<div className="flex items-center gap-3">
					<Label htmlFor="border">Border</Label>
					<Checkbox id="border" checked={border} onCheckedChange={setBorder} />
				</div>

				{border && (
					<div className="flex items-center gap-3">
						<Label>Border Color</Label>
						<Select value={borderColor} onValueChange={setBorderColor}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a color" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="white">White</SelectItem>
									<SelectItem value="black">Black</SelectItem>
									<SelectItem value="wood">Wood</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				)}

				<div className="flex items-center gap-3">
					<Label htmlFor="gap">Gap</Label>
					<Input
						id="gap"
						type="number"
						value={gap}
						onChange={e => setGap(Number(e.target.value))}
					/>
				</div>

				<div>
					<h3 className="text-gray-700 mb-2">Arts</h3>
					<div className="flex items-center gap-2">
						<Input
							id="arts"
							type="text"
							placeholder="Enter the url of the art"
							value={art}
							onChange={e => setArt(e.target.value)}
						/>
						<Button variant="outline" onClick={handleAddArt}>
							Add
						</Button>
					</div>

					<div className="flex flex-col gap-2 mt-4">
						{arts?.map(art => (
							<div key={art.id} className="flex items-center gap-2">
								<img src={art.url} alt={art.id} className="h-25 w-auto" />
								<Checkbox checked={art.active} onCheckedChange={() => handleRemoveArt(art.id)} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
