import * as React from 'react';
import { Input } from './input';
import { Button } from './button';
import { CheckIcon, Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { cn } from '~/utils/shadcn';

export type ListEditorItem = string | number;

export type ListEditorProps = {
	listItems: ListEditorItem[];
	onListChange: (listItems: ListEditorItem[]) => void;
	hideEditUIWhenDisabled?: boolean;
	disabled?: boolean;
};

export function ListEditor(props: ListEditorProps) {
	const {
		listItems,
		onListChange,
		hideEditUIWhenDisabled = false,
		disabled = false,
	} = props;

	const isEditUIHidden = hideEditUIWhenDisabled && disabled;

	const [newValue, setNewValue] = React.useState('');

	function handleDelete(index: number) {
		onListChange(listItems.filter((_, i) => i !== index));
	}

	function handleAdd(value: string) {
		onListChange([...listItems, value]);
		setNewValue('');
	}

	return (
		<ul className={cn('text-sm px-1', disabled && 'space-y-3')}>
			{listItems.map((item, index) => (
				<li key={index} className="flex items-center">
					<span className="break-words grow">{`${index + 1}. ${item}`}</span>

					{!isEditUIHidden && (
						<Button
							type="button"
							onClick={() => handleDelete(index)}
							disabled={disabled}
							variant="ghost-danger"
							size="icon"
						>
							<TrashIcon />

							<span className="sr-only">{`Delete ${item} item`}</span>
						</Button>
					)}
				</li>
			))}

			{!isEditUIHidden && (
				<li className="flex items-center">
					<Input
						value={newValue}
						onChange={e => setNewValue(e.target.value)}
						placeholder="Tambah kesukaan baru..."
						className="!text-sm !grow"
						style={{ all: 'unset', border: 'none' }}
					/>

					<Button
						type="button"
						onClick={() => handleAdd(newValue)}
						disabled={newValue.trim() === '' || disabled}
						variant="ghost-success"
						size="icon"
					>
						<CheckIcon />

						<span className="sr-only">{`Add ${newValue} item`}</span>
					</Button>
					<Button
						type="button"
						onClick={() => setNewValue('')}
						disabled={newValue.trim() === '' || disabled}
						variant="ghost-danger"
						size="icon"
					>
						<Cross2Icon />

						<span className="sr-only">{`Reset new value`}</span>
					</Button>
				</li>
			)}
		</ul>
	);
}
