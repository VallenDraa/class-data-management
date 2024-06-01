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
	Skeleton,
} from '~/components/ui';
import { useAdminEditForm } from '../hooks/use-admin-edit-form';

export type AdminEditFormSkeletonProps = {
	isOwnProfile?: boolean;
};

export function AdminEditFormSkeleton(props: AdminEditFormSkeletonProps) {
	return (
		<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
			<div className="flex flex-row items-center w-full gap-4 sm:w-32 sm:flex-col">
				<Skeleton className="h-auto mx-auto rounded-full w-28 aspect-square" />

				{props.isOwnProfile && (
					<div className="hidden w-full space-y-2 sm:block">
						<Skeleton className="w-full h-8 rounded-md" />
						<Skeleton className="w-full h-8 rounded-md" />
					</div>
				)}
			</div>

			<Skeleton className="w-full h-96" />
		</div>
	);
}

export type AdminEditFormProps = {
	onAdminDataUpdate: (data: AdminUpdate) => void | Promise<void>;
	admin: Admin;
};

export function AdminEditForm(props: AdminEditFormProps) {
	const { admin, onAdminDataUpdate } = props;

	const { adminForm, handleDataUpdate, isEditing } = useAdminEditForm(
		admin,
		onAdminDataUpdate,
	);

	return (
		<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row animate-in">
			<div className="flex flex-row items-center w-full gap-4 sm:w-32 sm:flex-col">
				<Avatar className="h-auto mx-auto w-28 aspect-square">
					<AvatarImage src={admin.foto_profile} />
					<AvatarFallback>{admin.nama.slice(0, 2)}</AvatarFallback>
				</Avatar>
			</div>

			<ScrollArea className="w-full">
				<Form {...adminForm}>
					<form
						onSubmit={adminForm.handleSubmit(handleDataUpdate)}
						className="w-full px-1 space-y-4"
					>
						<FormField
							control={adminForm.control}
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
							control={adminForm.control}
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
							control={adminForm.control}
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
		</section>
	);
}
