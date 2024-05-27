export function CircleDecoration() {
	return (
		<div className="relative w-32 h-32">
			<div className="absolute -top-16 left-4 w-32 h-32 bg-blue-500 rounded-full opacity-30 z-10" />
			<div className="absolute -left-10 -top-4 w-32 h-32 bg-blue-500 rounded-full opacity-30 z-20" />
		</div>
	);
}
