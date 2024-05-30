import * as React from 'react';

export const AdminMahasiswaDetailDialogStatusContext = React.createContext<{
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>({
	isOpen: false,
	setIsOpen: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminMahasiswaDetailDialogStatus = () =>
	React.useContext(AdminMahasiswaDetailDialogStatusContext);

export function AdminMahasiswaDetailStatusContextProvider(props: {
	children: React.ReactNode;
}) {
	const [isDetailOpen, setIsDetailOpen] = React.useState(false);

	const statusValue = React.useMemo(
		() => ({
			isOpen: isDetailOpen,
			setIsOpen: setIsDetailOpen,
		}),
		[isDetailOpen],
	);

	return (
		<AdminMahasiswaDetailDialogStatusContext.Provider value={statusValue}>
			{props.children}
		</AdminMahasiswaDetailDialogStatusContext.Provider>
	);
}
