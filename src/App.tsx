import Preview from '@/features/Preview'
import Settings from '@/features/Settings'
import './App.css'

function App() {
	return (
		<div className="h-screen bg-gray-50 flex flex-col">
			{/* <header className="bg-white shadow p-4 text-2xl font-bold text-center">My Wall Art</header> */}
			<main className="flex flex-1 gap-4 p-4">
				<section className="flex-1 bg-white rounded-lg shadow overflow-hidden">
					<Preview />
				</section>
				<aside className="w-80 bg-white rounded-lg shadow">
					<Settings />
				</aside>
			</main>
		</div>
	)
}

export default App
