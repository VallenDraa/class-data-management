import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Popover, PopoverTrigger, Button, PopoverContent, Calendar } from '.';
import { cn } from '~/utils/shadcn';

export type DatePickerProps = {
	date: Date;
	onChange: (date: Date | undefined) => void;
	disabled?: boolean;
	className?: string;
};

export function DatePicker(props: DatePickerProps) {
	const { date, onChange, disabled, className } = props;

	return (
		<Popover>
			<PopoverTrigger disabled={disabled} asChild>
				<Button
					variant={'outline'}
					className={cn(
						'justify-start text-left font-normal w-full bg-transparent dark:bg-transparent',
						!date && 'text-neutral-500',
						className,
					)}
				>
					<CalendarIcon className="w-4 h-4 mr-2" />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={onChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
