import * as React from 'react';
import L from 'leaflet';
import { UseFormReturn } from 'react-hook-form';
import {
	Button,
	DatePicker,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	ListEditor,
	PositionPickerMap,
	ScrollArea,
	Separator,
	Skeleton,
	WaypointMap,
} from '~/components/ui';
import { Mahasiswa, MahasiswaUpdate } from '../types';
import { useGeoLocation } from '~/hooks';
import { Coordinate } from '~/types';

export type MahasiswaFormFieldsProps = {
	isEditing: boolean;
	form: UseFormReturn<MahasiswaUpdate>;
	mahasiswa: Mahasiswa;
	handleOnDataUpdate: (data: MahasiswaUpdate) => void | Promise<void>;
};

export function MahasiswaFormFields(props: MahasiswaFormFieldsProps) {
	const { isEditing, form, mahasiswa, handleOnDataUpdate } = props;

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

	return (
		<ScrollArea className="w-full grow">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleOnDataUpdate)}
					className="w-full px-1 space-y-4"
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
						control={form.control}
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
						<Button
							disabled={form.formState.isSubmitting}
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
	);
}
