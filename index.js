import { addContact, listContacts } from "./contacts.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;
const action = argv.action;

switch (action) {
  case "list":
    listContacts();
    break;

  case "add":
    const hasAllArguments = argv.name && argv.email && argv.phone;
    if (!hasAllArguments) {
      console.log(
        `For adding a new contact we need 'name', 'email' and 'phone'`.bgRed
      );
    } else {
      addContact(argv.name, argv.email, argv.phone);
    }
    break;

  default:
    console.log(`This command ${action} is not supported`.bgYellow);
}
