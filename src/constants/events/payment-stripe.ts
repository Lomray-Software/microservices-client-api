/**
 * Payment-stripe events
 */
enum Event {
  EntityPaid = 'event.payment-stripe.provider.entity-paid',
  SetupIntentSucceeded = 'event.payment-stripe.provider.setup-intent-succeeded',
  PaymentMethodUpdated = 'event.payment-stripe.provider.payment-method-updated',
  PaymentMethodRemoved = 'event.payment-stripe.provider.payment-method-removed',
  PaymentIntentError = 'event.payment-stripe.provider.payment-intent-error',
  PaymentIntentInProcess = 'event.payment-stripe.provider.payment-intent-in-process',
  PaymentIntentSuccess = 'event.payment-stripe.provider.payment-intent-success',
}

export default Event;
