import { isRouteErrorResponse } from 'react-router-dom';
import z from 'zod';

export function getErrorMessage(err: unknown) {
	if (err instanceof z.ZodError) {
		const errors = err.issues.map(issue => issue.message);
		return errors.join('\n');
	}

	if (isRouteErrorResponse(err)) {
		return err.statusText;
	}

	if (err instanceof Error) {
		return err.message;
	}

	return 'Terjadi sebuah kesalahan, silahkan coba lagi.';
}
