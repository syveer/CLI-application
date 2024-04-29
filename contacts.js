import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = join(__dirname, "db", "contacts.json");

/**
 * Funcție pentru a lista toate contactele.
 */
export async function listContacts() {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    console.table(contacts);
  } catch (error) {
    console.error("Error listing contacts:", error);
  }
}

/**
 * Funcție pentru a adăuga un nou contact.
 * @param {string} name Numele contactului.
 * @param {string} email Adresa de email a contactului.
 * @param {string} phone Numărul de telefon al contactului.
 */
export async function addContact(name, email, phone) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const newContactId = randomUUID();
    const newContact = {
      id: newContactId,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added successfully!");
  } catch (error) {
    console.error("Error adding contact:", error);
  }
}
