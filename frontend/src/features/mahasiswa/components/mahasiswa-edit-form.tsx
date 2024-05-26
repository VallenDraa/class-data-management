import * as React from 'react';
import L from 'leaflet';
import { type Coordinate } from '~/types';
import { type MahasiswaUpdate } from '../types';
import { UseFormReturn } from 'react-hook-form';
import {
	FormLabel,
	FormMessage,
	Input,
	DatePicker,
	ScrollArea,
	Separator,
	WaypointMap,
	Skeleton,
	PositionPickerMap,
	ListEditor,
	FormField,
	Form,
	FormItem,
	FormControl,
	Button,
} from '~/components/ui';
import { useGeoLocation } from '~/hooks';

export type MahasiswaEditFormProps = {
	form: UseFormReturn<MahasiswaUpdate>;
	onSubmit: (data: MahasiswaUpdate) => void;
	user: MahasiswaUpdate;
	isEditing: boolean;
};

export function MahasiswaEditForm(props: MahasiswaEditFormProps) {
	const { form, user, isEditing, onSubmit } = props;

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

	return (
		<ScrollArea className="w-full sm:max-h-96">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-4"
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
								<FormLabel className="text-xs text-neutral-500">NIM</FormLabel>
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
											<span>Geolocation tidak didukung oleh browser anda</span>
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
	);
}
