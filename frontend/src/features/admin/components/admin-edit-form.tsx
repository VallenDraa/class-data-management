import * as React from 'react';
import { type Admin, type AdminUpdate } from '../types';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	Button,
	FormLabel,
	FormMessage,
	Input,
	ScrollArea,
	FormField,
	Form,
	FormItem,
	FormControl,
} from '~/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateAdminValidator } from '../api';
import { useForm } from 'react-hook-form';

export type AdminEditFormProps = {
	onSubmit: (data: AdminUpdate) => void | Promise<void>;
	admin: Admin;
};

export function AdminEditForm(props: AdminEditFormProps) {
	const { admin, onSubmit } = props;

	const [isEditing, setIsEditing] = React.useState(false);
	const form = useForm<AdminUpdate>({
		resolver: zodResolver(updateAdminValidator),
		defaultValues: {
			nama: admin.nama,
			email: admin.email,
		},
	});

	const handleEditing = () => {
		if (isEditing) {
			setIsEditing(false);
			form.reset();
		} else {
			setIsEditing(true);
		}
	};

	const handleEditProfileSubmit = async (data: AdminUpdate) => {
		await onSubmit(data);
		setIsEditing(false);
	};

	const editFormActions = (
		<div className="flex flex-col gap-2 grow">
			<Button
				onClick={handleEditing}
				className="w-full"
				size="sm"
				variant={isEditing ? 'destructive' : 'default'}
			>
				{isEditing ? 'Cancel Edit' : 'Edit Profil'}
			</Button>
		</div>
	);

	return (
		<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row animate-in">
			<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
				<Avatar className="h-auto mx-auto w-28 sm:w-full aspect-square">
					<AvatarImage src={admin.foto_profile} />
					<AvatarFallback>{admin.nama.slice(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="hidden sm:block">{editFormActions}</div>
			</div>

			<ScrollArea className="w-full sm:max-h-96">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleEditProfileSubmit)}
						className="w-full space-y-4 px-0.5"
					>
						<FormField
							control={form.control}
							name="nama"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										Nama Admin
									</FormLabel>
									<FormControl>
										<Input
											className="disabled:opacity-100 disabled:cursor-auto"
											placeholder="-"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										Email
									</FormLabel>
									<FormControl>
										<Input
											className="disabled:opacity-100 disabled:cursor-auto"
											type="email"
											placeholder="-"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="jabatan"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										Jabatan
									</FormLabel>
									<FormControl>
										<Input
											className="disabled:opacity-100 disabled:cursor-auto"
											type="text"
											placeholder="-"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{isEditing && (
							<Button type="submit" size="sm" className="w-full">
								Simpan
							</Button>
						)}
					</form>
				</Form>
			</ScrollArea>

			<div className="block sm:hidden">{editFormActions}</div>
		</section>
	);
}
