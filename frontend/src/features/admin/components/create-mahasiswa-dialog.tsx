import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Button,
	DatePicker,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	ScrollArea,
} from '~/components/ui';
import { addMahasiswaValidator } from '../api';
import { MahasiswaInsert } from '~/features/mahasiswa/types';
import { PlusIcon } from '@radix-ui/react-icons';

export type CreateMahasiswaDialogProps = {
	onCreate: (data: MahasiswaInsert) => void | Promise<void>;
};

export function CreateMahasiswaDialog(props: CreateMahasiswaDialogProps) {
	const { onCreate } = props;

	const [isFormOpened, setIsFormOpened] = React.useState(false);
	const form = useForm<MahasiswaInsert>({
		resolver: zodResolver(addMahasiswaValidator),
		defaultValues: {
			alamat: '',
			nama: '',
			nim: '',
			tanggal_lahir: new Date().toISOString(),
		},
	});

	const handleSubmit = async (data: MahasiswaInsert) => {
		await onCreate(data);
		setIsFormOpened(false);
	};

	return (
		<Dialog open={isFormOpened} onOpenChange={setIsFormOpened}>
			<DialogTrigger asChild>
				<Button size="icon" className="rounded-full">
					<PlusIcon />
					<span className="sr-only">Buat mahasiswa baru</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="flex flex-col h-screen sm:h-auto">
				<DialogHeader>
					<DialogTitle>Buat Mahasiswa</DialogTitle>
				</DialogHeader>

				<section className="flex flex-col justify-center gap-2 overflow-auto sm:gap-4 sm:flex-row">
					<ScrollArea className="w-full sm:max-h-96 grow">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSubmit)}
								className="w-full space-y-4 px-0.5"
							>
								<FormField
									control={form.control}
									name="nama"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs text-neutral-500">
												Nama Mahasiswa
											</FormLabel>
											<FormControl>
												<Input
													className="disabled:opacity-100 disabled:cursor-auto"
													placeholder="Nama Mahasiswa"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="nim"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs text-neutral-500">
												NIM
											</FormLabel>
											<FormControl>
												<Input
													className="disabled:opacity-100 disabled:cursor-auto"
													type="number"
													placeholder="NIM"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="tanggal_lahir"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="text-xs text-neutral-500">
												Tanggal lahir
											</FormLabel>
											<DatePicker
												date={new Date(field.value ?? new Date())}
												className="disabled:opacity-100 disabled:cursor-auto"
												onChange={date => field.onChange(date?.toString())}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="alamat"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs text-neutral-500">
												Alamat
											</FormLabel>
											<FormControl>
												<Input
													className="disabled:opacity-100 disabled:cursor-auto"
													type="text"
													placeholder="Alamat"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									disabled={form.formState.isSubmitting}
									type="submit"
									size="sm"
									className="w-full"
								>
									Simpan
								</Button>
							</form>
						</Form>
					</ScrollArea>
				</section>
			</DialogContent>
		</Dialog>
	);
}
