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
import { RedirectLink } from './redirect-link';
import { useNavigate } from 'react-router-dom';
import {
	mahasiswaLogin,
	MahasiswaLoginSchema,
	mahasiswaLoginValidator,
} from '../api';
import { toast } from 'sonner';
import { getErrorMessage } from '~/utils/get-error-message';

export function MahasiswaLogin() {
	const form = useForm<MahasiswaLoginSchema>({
		resolver: zodResolver(mahasiswaLoginValidator),
		defaultValues: { nim: '', password: '' },
	});

	const navigate = useNavigate();
	const onSubmit = async (data: MahasiswaLoginSchema) => {
		try {
			const message = await mahasiswaLogin(data);
			toast.success(message);
			navigate('/mahasiswa', { replace: true });
		} catch (error) {
			toast.error(getErrorMessage(error));
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
					<Button disabled={form.formState.isSubmitting} type="submit">
						Sign In
					</Button>
				</form>
			</Form>

			<div className="my-2">
				<RedirectLink className="my-0" to="/mahasiswa/register">
					Register Mahasiswa
				</RedirectLink>
				<RedirectLink className="my-0" to="/admin/login">
					Login Sebagai Admin
				</RedirectLink>
			</div>
		</div>
	);
}
