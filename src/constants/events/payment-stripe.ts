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
  RefundSuccess = 'event.payment-stripe.provider.refund-success',
  RefundInProcess = 'event.payment-stripe.provider.refund-in-process',
  RefundFailed = 'event.payment-stripe.provider.refund-failed',
  RefundCanceled = 'event.payment-stripe.provider.refund-canceled',
}

export default Event;
