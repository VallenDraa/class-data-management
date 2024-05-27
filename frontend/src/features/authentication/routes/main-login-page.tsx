import { HomePageLayout } from '~/components/layouts';
import { LoginMahasiswa } from '../components/login-mahasiswa';
import { Bulet3 } from '../components/bulet-bulet';

export function LoginPage() {
    return (
        <div>			
            <Bulet3/>
        <HomePageLayout>
            <header className="flex items-center justify-between px-1 py-4">
                <h1 className="text-lg font-semibold leading-7">Kelass</h1>
            </header>
            <div className="flex flex-col items-center mt-10">
                <img src='https://github.com/shadcn.png' alt="Profile" className='w-80 mb-16' />
            </div>
            <LoginMahasiswa/>
        </HomePageLayout>
        </div>
    );
}
