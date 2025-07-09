import './App.css'
import Preview from './features/Preview'
import Settings from './features/Settings'

function App() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<header className="bg-white shadow p-4 text-2xl font-bold text-center">My Wall Art</header>
			<main className="flex flex-1 gap-4 p-4">
				<section className="flex-1 bg-white rounded-lg shadow p-6 ">
					<Preview />
				</section>
				<aside className="w-80 bg-white rounded-lg shadow p-6">
					<Settings />
				</aside>
			</main>
		</div>
	)
}

export default App
