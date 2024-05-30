export type EndOfListProps = {
	message: string;
};

export function EndOfList(props: EndOfListProps) {
	return (
		<p className="my-2 text-xs text-center text-neutral-500">{props.message}</p>
	);
}
