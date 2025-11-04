
export default function Loader({ message = 'Chargement...', fullScreen = true, className = '' }) {
	const containerClasses = fullScreen
		? `fixed inset-0 z-50 flex items-center justify-center bg-white/60 ${className}`
		: `inline-flex items-center justify-center ${className}`

	return (
		<div className={containerClasses} aria-live="polite" role="status">
			<div className="flex flex-col items-center gap-3">
				<svg
					className="w-12 h-12 text-orange-600 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
				</svg>

				<span className="text-sm text-gray-700 dark:text-gray-200">{message}</span>
			</div>
		</div>
	)
}

