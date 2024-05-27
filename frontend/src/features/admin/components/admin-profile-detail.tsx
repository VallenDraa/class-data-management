import { type Admin, type AdminUpdate } from '../types';
import { DialogContent, DialogHeader, DialogTitle } from '~/components/ui';
import { AdminEditForm } from './admin-edit-form';

export type AdminProfileDetailProps = {
	detailTitle?: string;
	admin: Admin;
	onDetailClose?: () => void;
};

export function AdminProfileDetail(props: AdminProfileDetailProps) {
	const { detailTitle, admin, onDetailClose } = props;

	const handleSubmit = (data: AdminUpdate) => {
		console.log(data);
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

			<AdminEditForm onSubmit={handleSubmit} admin={admin} />
		</DialogContent>
	);
}
