import { type Admin } from '../types';
import {
	DialogContent,
	DialogErrorMessage,
	DialogHeader,
	DialogTitle,
	Skeleton,
} from '~/components/ui';
import { AdminEditForm } from './admin-edit-form';

export type AdminProfileDetailErrorProps = {
	message: string;
};
export function AdminProfileDetailError(props: AdminProfileDetailErrorProps) {
	const { message } = props;

	return (
		<DialogContent>
			<DialogErrorMessage
				title="Gagal memuat data admin"
				message={message}
				refreshPage
			/>
		</DialogContent>
	);
}

export function AdminProfileDetailSkeleton() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="mb-5">Profil Anda</DialogTitle>
			</DialogHeader>

			<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
				<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
					<Skeleton className="h-auto mx-auto rounded-full w-28 sm:w-full aspect-square" />

					<div className="hidden w-full space-y-2 sm:block">
						<Skeleton className="w-full h-8 rounded-md" />
						<Skeleton className="w-full h-8 rounded-md" />
					</div>
				</div>

				<Skeleton className="w-full h-96" />
			</div>
		</DialogContent>
	);
}

export type AdminProfileDetailProps = {
	detailTitle?: string;
	admin: Admin;
	onDetailClose?: () => void;
};

export function AdminProfileDetail(props: AdminProfileDetailProps) {
	const { detailTitle, admin, onDetailClose } = props;

	const handleSubmit = () => {
		//! Not implemented
	};

	return (
		<DialogContent
			className="h-screen sm:h-max"
			onClose={onDetailClose}
			onEscapeKeyDown={onDetailClose}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">
					{detailTitle || `Profil ${admin?.nama ?? 'Admin'}`}
				</DialogTitle>
			</DialogHeader>

			<AdminEditForm onAdminDataUpdate={handleSubmit} admin={admin} />
		</DialogContent>
	);
}
