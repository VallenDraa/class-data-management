import { buttonVariants } from './button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog';
import { Separator } from './separator';

export function LoginInfo() {
	return (
		<Dialog>
			<DialogTrigger
				className={buttonVariants({ size: 'sm', variant: 'default' })}
			>
				Data Login
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Data Login (Buat Pak Hendra)</DialogTitle>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1 text-neutral-500 dark:text-neutral-400">
							<p className="font-bold">Login Admin</p>
							<p>email: oskhar@gmail.com</p>
							<p>password: 12345678</p>
						</div>

						<Separator />
						<div className="flex flex-col gap-1 text-neutral-500 dark:text-neutral-400">
							<p className="font-bold">Login mahasiswa</p>
							<p>NIM: 12345678</p>
							<p>password: 12345678</p>
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
