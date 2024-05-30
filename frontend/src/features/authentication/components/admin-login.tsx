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
import { toast } from 'sonner';
import { adminLogin } from '../api';
import { DEFAULT_ERROR_MESSAGE } from '~/utils/get-error-message';

// Schema untuk form admin
const adminValidator = z.object({
	email: z.string().email('Email tidak valid'),
	password: z.string().min(1, 'Password tidak boleh kosong'),
});

type AdminSchema = z.infer<typeof adminValidator>;

export function AdminLogin() {
	const form = useForm<AdminSchema>({
		resolver: zodResolver(adminValidator),
		defaultValues: { email: '', password: '' },
	});

	const navigate = useNavigate();
	const onSubmit = async (data: AdminSchema) => {
		try {
			const message = await adminLogin(data.email, data.password);
			toast.success(message);
			navigate('/admin', { replace: true });
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				return;
			}

			toast.error(DEFAULT_ERROR_MESSAGE);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col px-6 space-y-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="Email" {...field} />
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
					<Button disabled={form.formState.isSubmitting} type="submit">
						Sign In
					</Button>
				</form>
			</Form>

			<RedirectLink to="/mahasiswa/login">Login Sebagai Mahasiswa</RedirectLink>
		</>
	);
}
