interface FormEvent extends CustomEvent {}

interface MedisysDocumentEvent {
  createEvent(eventInterface: 'FormEvent'): FormEvent;
}
