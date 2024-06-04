import {
	Input,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	DatePicker,
} from '~/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RedirectLink } from './redirect-link';
import { useNavigate } from 'react-router-dom';
import {
	mahasiswaRegister,
	MahasiswaRegisterSchema,
	mahasiswaRegisterValidator,
} from '../api';
import { toast } from 'sonner';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';

export function MahasiswaRegister() {
	const form = useForm<MahasiswaRegisterSchema>({
		resolver: zodResolver(mahasiswaRegisterValidator),
		defaultValues: {
			nim: '',
			nama: '',
			alamat: '',
			tanggal_lahir: new Date().toISOString(),
		},
	});

	console.log(form.formState.errors);

	const navigate = useNavigate();
	const onSubmit = async (data: MahasiswaRegisterSchema) => {
		try {
			const message = await mahasiswaRegister(data);

			toast.success(message);
			navigate('/mahasiswa/login', { replace: true });
		} catch (error) {
			if (error instanceof Error) {
				toast.error(getErrorMessage(error));
				return;
			}

			toast.error(DEFAULT_ERROR_MESSAGE);
		}
	};

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col px-6 space-y-4"
				>
					<FormField
						control={form.control}
						name="nim"
						render={({ field }) => (
							<FormItem>
								<FormLabel>NIM</FormLabel>
								<FormControl>
									<Input placeholder="NIM" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="nama"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama</FormLabel>
								<FormControl>
									<Input placeholder="Nama" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="items-end gap-2 space-y-2 sm:flex">
						<FormField
							control={form.control}
							name="tanggal_lahir"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tanggal lahir</FormLabel>
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
									<FormLabel>Alamat</FormLabel>
									<FormControl>
										<Input type="alamat" placeholder="Alamat" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={form.formState.isSubmitting} type="submit">
						Register
					</Button>
				</form>
			</Form>

			<div className="my-2">
				<RedirectLink className="my-0" to="/mahasiswa/login">
					Login Sebagai Mahasiswa
				</RedirectLink>
				<RedirectLink className="my-0" to="/admin/login">
					Login Sebagai Admin
				</RedirectLink>
			</div>
		</div>
	);
}
