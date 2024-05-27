import * as React from 'react';
import L from 'leaflet';
import { type Coordinate } from '~/types';
import {
	type Mahasiswa,
	type MahasiswaUpdate,
} from '~/features/mahasiswa/types';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	Button,
	Skeleton,
	FormLabel,
	FormMessage,
	Input,
	DatePicker,
	ScrollArea,
	Separator,
	WaypointMap,
	PositionPickerMap,
	ListEditor,
	FormField,
	Form,
	FormItem,
	FormControl,
} from '~/components/ui';
import { useGeoLocation } from '~/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateMahasiswaValidator } from '~/features/mahasiswa/api';
import { HapusMahasiswaDialog } from './hapus-mahasiswa-dialog';
import { useAdminMahasiswaDetailDialogStatus } from './admin-mahasiswa-list-item';

export function AdminMahasiswaEditFormSkeleton() {
	return (
		<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
			<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
				<Skeleton className="h-auto mx-auto w-28 sm:w-full aspect-square rounded-full" />

				<div className="space-y-2 w-full hidden sm:block">
					<Skeleton className="h-8 w-full rounded-md" />
					<Skeleton className="h-8 w-full rounded-md" />
				</div>
			</div>

			<Skeleton className="w-full h-96" />
		</section>
	);
}

export type AdminMahasiswaEditFormProps = {
	onSubmit: (data: MahasiswaUpdate) => void | Promise<void>;
	user: Mahasiswa;
};

export function AdminMahasiswaEditForm(props: AdminMahasiswaEditFormProps) {
	const { user, onSubmit } = props;

	const { setIsOpen } = useAdminMahasiswaDetailDialogStatus();

	const [isEditing, setIsEditing] = React.useState(false);
	const form = useForm<MahasiswaUpdate>({
		resolver: zodResolver(updateMahasiswaValidator),
		defaultValues: {
			list_kesukaan: user.list_kesukaan,
			alamat: user.alamat,
			nama: user.nama,
			nim: user.nim,
			no_telepon: user.no_telepon,
			tanggal_lahir: user.tanggal_lahir,
		},
	});

	const { userLocation, isSupported, isLoading } = useGeoLocation();
	const currentUserLocation = React.useMemo(
		(): Coordinate => ({
			lat: userLocation?.lat ?? 0,
			lng: userLocation?.lng ?? 0,
			markerMessage: 'Lokasi Anda',
		}),
		[userLocation?.lat, userLocation?.lng],
	);
	const mahasiswaLocation = React.useMemo(
		(): Coordinate => ({
			lat: Number(user.alamat?.latitude ?? 0),
			lng: Number(user.alamat?.longitude ?? 0),
			markerMessage: `Alamat rumah milik ${user.nama}`,
		}),
		[user.alamat?.latitude, user.alamat?.longitude, user.nama],
	);

	const handleEditing = () => {
		if (isEditing) {
			setIsEditing(false);
			form.reset();
		} else {
			setIsEditing(true);
		}
	};

	const handleEditProfileSubmit = async (data: MahasiswaUpdate) => {
		await onSubmit(data);
		setIsEditing(false);
	};

	const handleDeleteMahasiswa = async () => {
		setIsOpen(false);
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

			<HapusMahasiswaDialog onDelete={handleDeleteMahasiswa}>
				<Button className="w-full" size="sm" variant="destructive">
					Hapus Mahasiswa
				</Button>
			</HapusMahasiswaDialog>
		</div>
	);

	return (
		<section className="flex flex-col gap-2 h-full sm:gap-4 sm:flex-row sm:h-96">
			<div className="flex flex-row items-center w-full gap-4 sm:w-32 sm:flex-col">
				<Avatar className="h-auto mx-auto w-28 sm:w-full aspect-square">
					<AvatarImage src={user.foto_profile} />
					<AvatarFallback>{user.nama.slice(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="hidden sm:block">{editFormActions}</div>
			</div>

			<ScrollArea className="w-full grow h-full">
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
										Nama Mahasiswa
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
							name="nim"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										NIM
									</FormLabel>
									<FormControl>
										<Input
											className="disabled:opacity-100 disabled:cursor-auto"
											type="number"
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
							name="no_telepon"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										No. Telepon
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

						<FormField
							control={form.control}
							name="tanggal_lahir"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="text-xs text-neutral-500">
										Tanggal lahir
									</FormLabel>
									<DatePicker
										disabled={!isEditing}
										date={new Date(field.value ?? new Date())}
										className="disabled:opacity-100 disabled:cursor-auto"
										onChange={date => field.onChange(date?.toString())}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="list_kesukaan"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="text-xs text-neutral-500">
										List Kesukaan
									</FormLabel>
									<ListEditor
										disabled={!isEditing}
										hideEditUIWhenDisabled
										listItems={field.value ?? []}
										onListChange={field.onChange}
									/>
								</FormItem>
							)}
						/>

						<Separator />

						<FormField
							control={form.control}
							name="alamat.alamat"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										Alamat & Peta
									</FormLabel>
									<FormControl>
										<Input
											className="disabled:opacity-100 disabled:cursor-auto"
											type="tel"
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
							name="alamat"
							disabled={!isEditing}
							render={({ field }) => {
								return (
									<div className="w-full border rounded-md shadow-sm h-80 overflow-clip border-neutral-200">
										{isLoading && (
											<Skeleton className="w-full h-full rounded-md" />
										)}

										{!isSupported && !isLoading && (
											<div className="flex items-center justify-center w-full h-full text-neutral-500">
												<span>
													Geolocation tidak didukung oleh browser anda
												</span>
											</div>
										)}

										{isSupported && !isLoading && !isEditing && (
											<WaypointMap
												startCoordinate={currentUserLocation}
												endCoordinate={mahasiswaLocation}
											/>
										)}

										{isSupported && !isLoading && isEditing && (
											<PositionPickerMap
												position={
													new L.LatLng(
														mahasiswaLocation.lat,
														mahasiswaLocation.lng,
													)
												}
												onPositionChange={position =>
													field.onChange({
														...field.value,
														latitude: String(position.lat),
														longitude: String(position.lng),
													})
												}
											/>
										)}
									</div>
								);
							}}
						/>

						{isEditing && (
							<Button type="submit" size="sm" className="w-full">
								Simpan
							</Button>
						)}
					</form>
				</Form>
			</ScrollArea>

			<div className="block sm:hidden mb-[90px] sm:mb-0">{editFormActions}</div>
		</section>
	);
}
