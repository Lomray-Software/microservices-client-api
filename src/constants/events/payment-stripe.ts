/**
 * Payment-stripe events
 */
enum Event {
  EntityPaid = 'event.payment-stripe.provider.entity-paid',
  SetupIntentSucceeded = 'event.payment-stripe.provider.setup-intent-succeeded',
  PaymentMethodUpdated = 'event.payment-stripe.provider.payment-method-updated',
  PaymentMethodRemoved = 'event.payment-stripe.provider.payment-method-removed',
}

export default Event;
