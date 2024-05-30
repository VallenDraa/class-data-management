import { isAxiosError } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';
import z from 'zod';
import { ErrorApiResponse } from '~/types';

export const DEFAULT_ERROR_MESSAGE = 'Terjadi kesalahan, silahkan coba lagi';

export function getErrorMessage(err: unknown) {
	if (isAxiosError(err)) {
		const errResponse = err.response?.data;

		if (isErrorApiResponse(errResponse)) {
			if (errResponse.errors.message) {
				return errResponse.errors.message;
			}

			if ('message' in errResponse && errResponse.message) {
				return errResponse.message as string;
			}

			return err.message;
		}

		return err.message;
	}

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

export function isErrorApiResponse(
	response: unknown,
): response is ErrorApiResponse {
	if (typeof response !== 'object' || response === null) {
		return false;
	}

	return 'errors' in response;
}
