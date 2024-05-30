import * as React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { changePasswordValidator } from '../api/update-mahasiswa-password';

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
			recent_password: '',
			new_password: '',
			confirm_password: '',
		},
	});

	const handleSubmit = async (data: ChangePassword) => {
		await onSubmit(data);
		form.reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ganti Password</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="recent_password"
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
							name="new_password"
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
							name="confirm_password"
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

						<Button
							className="w-full"
							type="submit"
							disabled={form.formState.isSubmitting}
						>
							Ganti
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
