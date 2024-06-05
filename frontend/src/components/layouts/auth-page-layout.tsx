import { CircleDecoration } from '../ui';
import { LoginInfo } from '../ui/login-info';
import logoUin from '/logo-uin.png';

export type AuthPageLayoutProps = {
	children: React.ReactNode;
};

export function AuthPageLayout(props: AuthPageLayoutProps) {
	const { children } = props;

	return (
		<div className="relative flex flex-col h-screen max-w-xl px-4 mx-auto">
			<CircleDecoration />

			<div className="absolute right-0 top-2">
				<LoginInfo />
			</div>

			<div className="flex flex-col items-center">
				<img src={logoUin} alt="Profile" className="w-44" />
			</div>

			{children}
		</div>
	);
}
