export class ContactModel {
  public contactLoginName: string;
  public comment: string;

  constructor(contactLoginName: string, comment: string) {
    this.contactLoginName = contactLoginName;
    this.comment = comment;
  }

}
