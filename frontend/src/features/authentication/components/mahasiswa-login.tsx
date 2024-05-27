import {
	Input,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RedirectLink } from './redirect-link';
import { useNavigate } from 'react-router-dom';
import { mahasiswaLogin } from '../api';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '~/utils/get-error-message';

const mahasiswaValidator = z.object({
	nim: z.string().min(1, 'NIM tidak valid'),
	password: z.string().min(8, 'Password tidak valid'),
});

export type MahasiswaSchema = z.infer<typeof mahasiswaValidator>;

export function MahasiswaLogin() {
	const form = useForm<MahasiswaSchema>({
		resolver: zodResolver(mahasiswaValidator),
		defaultValues: { nim: '', password: '' },
	});

	const navigate = useNavigate();
	const onSubmit = async (data: MahasiswaSchema) => {
		try {
			const message = await mahasiswaLogin(data.nim, data.password);
			toast.success(message);
			navigate('/mahasiswa', { replace: true });
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Sign In</Button>
				</form>
			</Form>

			<RedirectLink to="/admin/login">Login Sebagai Admin</RedirectLink>
		</div>
	);
}
