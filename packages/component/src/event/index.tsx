interface FormEvent extends Event {}

interface MedisysDocumentEvent {
  createEvent(eventInterface: 'FormEvent'): FormEvent;
}
