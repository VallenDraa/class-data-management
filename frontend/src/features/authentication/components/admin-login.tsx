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

// Schema untuk form admin
const adminValidator = z.object({
	email: z.string().email('Email tidak valid'),
	password: z.string().min(8, 'Password tidak valid'),
});

type AdminSchema = z.infer<typeof adminValidator>;

export function AdminLogin() {
	const form = useForm<AdminSchema>({
		resolver: zodResolver(adminValidator),
		defaultValues: { email: '', password: '' },
	});

	const navigate = useNavigate();
	const onSubmit = (data: AdminSchema) => {
		console.log('🚀 ~ onSubmit ~ data:', data);
		navigate('/admin');
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 flex flex-col px-6"
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
					<Button type="submit">Sign In</Button>
				</form>
			</Form>

			<RedirectLink to="/mahasiswa/login">Login Sebagai Mahasiswa</RedirectLink>
		</>
	);
}
