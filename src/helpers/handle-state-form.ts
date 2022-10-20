import type { FormikErrors, FormikHelpers } from 'formik';
import type { IValidationErrors } from '../endpoints';

const handleStateForm = <TFormValue>(
  result: IValidationErrors<TFormValue> | boolean,
  values: TFormValue,
  helpers: {
    setError?: (message?: string | null) => void;
    setErrors: (errors: FormikErrors<TFormValue>) => void;
    resetForm?: FormikHelpers<TFormValue>['resetForm'];
  },
): void => {
  const { resetForm, setErrors, setError } = helpers;

  if (typeof result === 'boolean') {
    resetForm?.({ values });

    return;
  }

  const { fields, message } = result;

  if (fields) {
    setErrors(fields);
  } else {
    setError?.(message);
  }
};

export default handleStateForm;
