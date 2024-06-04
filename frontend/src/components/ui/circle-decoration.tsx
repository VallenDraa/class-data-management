export function CircleDecoration() {
	return (
		<div className="relative w-32 h-32">
			<div className="absolute z-10 w-32 h-32 rounded-full -top-16 left-4 bg-sky-500 dark:bg-sky-700 opacity-30" />
			<div className="absolute z-20 w-32 h-32 rounded-full -left-10 -top-4 bg-sky-500 dark:bg-sky-700 opacity-30" />
		</div>
	);
}
