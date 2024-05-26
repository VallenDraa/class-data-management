import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
	Button,
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
} from '~/components/ui';

const changePasswordValidator = z
	.object({
		oldPassword: z.string().trim().min(8, 'Password sekarang tidak valid!'),
		newPassword: z.string().trim().min(8, 'Password baru minimal 8 karakter!'),
		newPasswordConfirmation: z
			.string()
			.trim()
			.min(8, 'Konfirmasi password baru minimal 8 karakter!'),
	})
	.refine(data => data.newPasswordConfirmation === data.oldPassword, {
		message: 'Konfirmasi password tidak sama dengan password baru!',
		path: ['newPasswordConfirmation'],
	});

export type ChangePassword = z.infer<typeof changePasswordValidator>;

export type ChangePasswordDialogProps = {
	children: React.ReactNode;
	onSubmit: (data: ChangePassword) => void | Promise<void>;
};

export function ChangePasswordDialog(props: ChangePasswordDialogProps) {
	const { children, onSubmit } = props;

	const form = useForm<ChangePassword>({
		resolver: zodResolver(changePasswordValidator),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			newPasswordConfirmation: '',
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ganti Password</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="oldPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password Sekarang</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Password sekarang..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password Baru</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Password 8 Karakter..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="newPasswordConfirmation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Konfirmasi Password Baru</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Konfirmasi password 8 Karakter..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Ganti</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
