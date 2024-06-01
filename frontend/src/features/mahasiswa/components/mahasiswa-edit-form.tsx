import * as React from 'react';
import L from 'leaflet';
import { type Coordinate } from '~/types';
import { type Mahasiswa, type MahasiswaUpdate } from '../types';
import {
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
	UserEditableAvatar,
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '~/components/ui';
import { useGeoLocation } from '~/hooks';
import { ChangePassword, ChangePasswordDialog } from './change-password-dialog';
import { useMahasiswaUpdateForm } from '../hooks';

export type MahasiswaEditSkeletonProps = {
	isOwnProfile?: boolean;
};

export function MahasiswaEditSkeleton(props: MahasiswaEditSkeletonProps) {
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

export type MahasiswaEditFormProps = {
	onAvatarUpdate: (base64Str: string | null) => void | Promise<void>;
	onPasswordUpdate: (password: ChangePassword) => void | Promise<void>;
	onDataUpdate: (data: MahasiswaUpdate) => void | Promise<void>;
	mahasiswa: Mahasiswa;
	isOwnProfile: boolean;
};

export function MahasiswaEditForm(props: MahasiswaEditFormProps) {
	const {
		mahasiswa,
		onAvatarUpdate,
		onDataUpdate,
		onPasswordUpdate,
		isOwnProfile,
	} = props;

	const {
		mahasiswaForm,
		handleEditing,
		handleOnDataUpdate,
		isEditing,
		isEditingImage,
		setIsEditingImage,
	} = useMahasiswaUpdateForm(mahasiswa, onDataUpdate);

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
			lat: Number(mahasiswa.latitude ?? 0),
			lng: Number(mahasiswa.longitude ?? 0),
			markerMessage: `Alamat rumah milik ${mahasiswa.nama}`,
		}),
		[mahasiswa.latitude, mahasiswa.longitude, mahasiswa.nama],
	);

	const editFormActions = isEditingImage ? null : (
		<div className="flex flex-col w-full gap-2 grow">
			{isOwnProfile && (
				<Button
					id="edit-profile"
					size="sm"
					className="w-full"
					onClick={handleEditing}
					variant={isEditing ? 'destructive' : 'default'}
					disabled={mahasiswaForm.formState.isSubmitting}
				>
					{isEditing ? 'Cancel Edit' : 'Edit Profil'}
				</Button>
			)}

			{isOwnProfile && (
				<ChangePasswordDialog onSubmit={onPasswordUpdate}>
					<Button
						id="change-password"
						size="sm"
						variant="outline"
						className="w-full"
						disabled={mahasiswaForm.formState.isSubmitting || isEditing}
					>
						Ganti Password
					</Button>
				</ChangePasswordDialog>
			)}
		</div>
	);

	return (
		<section className="flex flex-col h-1 gap-2 overflow-auto sm:gap-4 sm:flex-row animate-in grow">
			<div className="flex flex-row items-center justify-center w-full gap-4 sm:w-32 sm:flex-col sm:justify-start">
				{isOwnProfile ? (
					<UserEditableAvatar
						isEditing={isEditingImage}
						setIsEditing={setIsEditingImage}
						onSubmit={onAvatarUpdate}
						imageSrc={mahasiswa.foto_profile}
						alt={mahasiswa.nama.slice(0, 2)}
						className="h-auto mx-auto w-28 sm:w-full aspect-square"
					/>
				) : (
					<Avatar className="h-auto w-28 aspect-square">
						<AvatarImage src={mahasiswa.foto_profile} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>
				)}
				<div className="hidden w-full sm:block">{editFormActions}</div>
			</div>

			<ScrollArea className="w-full grow">
				<Form {...mahasiswaForm}>
					<form
						onSubmit={mahasiswaForm.handleSubmit(handleOnDataUpdate)}
						className="w-full px-1 space-y-4"
					>
						<FormField
							control={mahasiswaForm.control}
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
							control={mahasiswaForm.control}
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
							control={mahasiswaForm.control}
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
							control={mahasiswaForm.control}
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
							control={mahasiswaForm.control}
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
							control={mahasiswaForm.control}
							name="alamat"
							disabled={!isEditing}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-neutral-500">
										Alamat & Peta
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value?.alamat ?? ''}
											className="disabled:opacity-100 disabled:cursor-auto"
											type="text"
											placeholder="-"
											onChange={e =>
												field.onChange({
													...field.value,
													alamat: e.target.value,
												})
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={mahasiswaForm.control}
							name="alamat"
							disabled={!isEditing}
							render={({ field }) => {
								return (
									<div className="w-full border-none rounded-md shadow-sm h-80 overflow-clip">
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
							<Button
								disabled={mahasiswaForm.formState.isSubmitting}
								type="submit"
								size="sm"
								className="w-full"
							>
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
