type SubscribedType = 'member' | 'administrator' | 'creator';

export interface Subscription {
  is_subscribed: SubscribedType;
}
