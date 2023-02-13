/**
 * Files events
 */
enum Event {
  FileCreate = 'event.files.file.create',
  FileUpdate = 'event.files.file.update',
  FileRemove = 'event.files.file.remove',
  FileEntityCreate = 'event.files.file-entity.create',
  FileEntityUpdate = 'event.files.file-entity.update',
  FileEntityRemove = 'event.files.file-entity.remove',
}

export default Event;
