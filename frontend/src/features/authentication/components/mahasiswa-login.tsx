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
	const onSubmit = (data: MahasiswaSchema) => {
		console.log('🚀 ~ onSubmit ~ data:', data);
		navigate('/mahasiswa');
	};

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 flex flex-col px-6"
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
