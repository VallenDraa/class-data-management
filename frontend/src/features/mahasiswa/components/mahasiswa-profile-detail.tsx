import * as React from 'react';
import { type Coordinate } from '~/types';
import { type Mahasiswa, type MahasiswaUpdate } from '../types';
import { updateMahasiswaValidator } from '../api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	DatePicker,
	ScrollArea,
	Separator,
	WaypointMap,
	Skeleton,
} from '~/components/ui';
import { useGeoLocation } from '~/hooks';

export type MahasiswaProfileDetailProps = {
	user: Mahasiswa;
	isSeenByAdmin: boolean;
	isOwnProfile: boolean;
};

export function MahasiswaProfileDetail(props: MahasiswaProfileDetailProps) {
	const { user, isOwnProfile, isSeenByAdmin } = props;

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
			latitude: userLocation?.latitude ?? 0,
			longitude: userLocation?.longitude ?? 0,
			markerMessage: 'Lokasi Anda',
		}),
		[userLocation?.latitude, userLocation?.longitude],
	);
	const mahasiswaLocation = React.useMemo(
		(): Coordinate => ({
			latitude: Number(user.alamat?.latitude ?? 0),
			longitude: Number(user.alamat?.longitude ?? 0),
			markerMessage: `Alamat rumah milik ${user.nama}`,
		}),
		[user.alamat?.latitude, user.alamat?.longitude, user.nama],
	);

	const onSubmit = (data: MahasiswaUpdate) => {
		console.log(data);
	};

	return (
		<DialogContent
			className="h-screen md:h-max"
			onClose={() => setIsEditing(false)}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">Profil anda</DialogTitle>
			</DialogHeader>

			<section className="flex flex-col gap-6 overflow-auto md:flex-row">
				<div className="w-full md:w-28">
					<Avatar className="h-auto mx-auto mb-4 w-36 md:w-full aspect-square">
						<AvatarImage src={user.foto_profile} />
						<AvatarFallback>{user.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col gap-2">
						{(isSeenByAdmin || isOwnProfile) && (
							<Button
								onClick={() => setIsEditing(prev => !prev)}
								className="w-full"
								size="sm"
								variant={isEditing ? 'destructive' : 'default'}
							>
								{isEditing ? 'Cancel Edit' : 'Edit Profil'}
							</Button>
						)}

						{isSeenByAdmin && (
							<Button className="w-full" size="sm" variant="ghost-danger">
								Hapus Mahasiswa
							</Button>
						)}

						{isOwnProfile && (
							<Button className="w-full" size="sm" variant="outline">
								Ganti Password
							</Button>
						)}
					</div>
				</div>

				<ScrollArea className="w-full pr-3 md:max-h-96">
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

							{isLoading && <Skeleton className="w-full rounded-md h-80" />}

							{isSupported && !isLoading && (
								<div className="w-full border rounded-md shadow-sm h-80 overflow-clip border-neutral-200">
									<WaypointMap
										startCoordinate={currentUserLocation}
										endCoordinate={mahasiswaLocation}
									/>
								</div>
							)}

							{isEditing && (
								<Button type="submit" size="sm" className="w-full">
									Simpan
								</Button>
							)}
						</form>
					</Form>
				</ScrollArea>
			</section>
		</DialogContent>
	);
}
