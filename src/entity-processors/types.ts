export interface EntityProcessors<T> {
  areEqual: (instance1: T, instance2: T) => boolean;
  isValid: (instance: T) => boolean;
  // toDto: (instance: T) => DTO;
  // fromDto: (dto: DTO) => T;
}
