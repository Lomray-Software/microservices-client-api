import type { FormikErrors, FormikHelpers } from 'formik';
import type { IValidationErrors } from '../endpoints';

export type THandleStateForm = <TFormValue>(
  result: IValidationErrors<TFormValue> | boolean,
  values: TFormValue | null,
  helpers: {
    setError?: (message?: string | null) => void;
    setErrors: (errors: FormikErrors<TFormValue>) => void;
    resetForm?: FormikHelpers<TFormValue>['resetForm'];
  },
) => void;

/**
 * Set errors for fields and main error also adding notification for success
 */
const handleStateForm: THandleStateForm = (result, values, helpers) => {
  const { resetForm, setErrors, setError } = helpers;

  if (typeof result === 'boolean') {
    if (values !== null) {
      resetForm?.({ values });
    }

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
