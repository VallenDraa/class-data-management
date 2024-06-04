import { CircleDecoration } from '../ui';
import logoUin from '/logo-uin.png';

export type AuthPageLayoutProps = {
	children: React.ReactNode;
};

export function AuthPageLayout(props: AuthPageLayoutProps) {
	const { children } = props;

	return (
		<div className="flex flex-col h-screen max-w-xl px-4 mx-auto">
			<CircleDecoration />
			<div className="flex flex-col items-center">
				<img src={logoUin} alt="Profile" className="w-44" />
			</div>

			{children}
		</div>
	);
}
