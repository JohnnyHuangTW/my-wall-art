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
import { Trash2Icon } from 'lucide-react'
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
			setArts([...arts, { id: Date.now().toString(), url: art, active: true, order: arts.length }])
			setArt('')
		}
	}

	const toggleArt = (id: string) => {
		setArts(arts.map(art => (art.id === id ? { ...art, active: !art.active } : art)))
	}

	const removeArt = (id: string) => {
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

					<div className="grid grid-cols-2 gap-2 mt-4 overflow-y-auto max-h-[400px]">
						{arts?.map(art => (
							<div key={art.id} className="flex items-center gap-2">
								<div className="flex items-center gap-2 relative group">
									<img
										src={art.url}
										alt={art.id}
										className="h-25 w-auto group-hover:scale-105 group-hover:opacity-50 transition-all duration-300"
									/>
									<Button
										variant="ghost"
										className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block bg-transparent hover:bg-transparent"
										onClick={() => removeArt(art.id)}
									>
										<Trash2Icon className="size-8 text-gray-700 transition-all duration-300" />
									</Button>
								</div>
								<Checkbox checked={art.active} onCheckedChange={() => toggleArt(art.id)} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
