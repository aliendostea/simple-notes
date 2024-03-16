import { test, expect } from "@playwright/test";

const URL_APP = "http://localhost:3000/";

const NOTES = [
  {
    title: "Title Esto es una prueba playwright",
    note: "Note Esto es una prueba playwright",
  },
  {
    title: "Title second note2",
    note: "Note second note2",
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto(URL_APP);
});

test.describe("E2E App", () => {
  test("Add note, search note and delete note", async ({ page }) => {
    // await page.waitForTimeout(400);
    // await expect(page.getByTestId("note-skeleton-loader")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Hey, you can add all your notes here!",
        exact: false,
      })
    ).toBeVisible();

    const emptyNotesElem = page.getByText("You don't have notes yet. Write your first note started", {
      exact: true,
    });

    await expect(emptyNotesElem).toBeVisible();

    const btnInHome = page.getByRole("button", { name: /Add new note/i, exact: true });
    btnInHome.click();

    /// add note in popup
    const inputNoteTitle = page.getByPlaceholder("Add note title", { exact: true });
    const inputNote = page.getByPlaceholder("Add note", { exact: true });

    await inputNoteTitle.fill(NOTES[0].title);
    await inputNote.fill(NOTES[0].note);

    const btnOnPopup = page.getByRole("button", { name: /Add note/i, exact: true });
    btnOnPopup.click();
    await expect(btnOnPopup).not.toBeVisible();

    /// check added note
    const noteAdded = page.getByTestId("note-element");
    await expect(noteAdded).toBeVisible();

    await expect(
      noteAdded.getByText(NOTES[0].title, {
        exact: true,
      })
    ).toBeVisible();

    await expect(
      noteAdded.getByText(NOTES[0].note, {
        exact: true,
      })
    ).toBeVisible();

    /// search added note in input search
    const boxSearchBar = page.getByTestId("box-search-bar");
    const inputSearchNote = page.getByPlaceholder("Search for the title or body of the note", { exact: true });
    await expect(inputSearchNote).toBeVisible();

    await inputSearchNote.fill(NOTES[0].title);
    await expect(inputSearchNote).toHaveValue(NOTES[0].title);

    await expect(
      noteAdded.getByText(NOTES[0].title, {
        exact: true,
      })
    ).toBeVisible();

    /// search added note in input search
    const btnDeleteSearhValue = boxSearchBar.getByRole("button", { name: /x/i, exact: true });
    btnDeleteSearhValue.click();
    await expect(inputSearchNote).toHaveValue("");

    /// search NOT added note in input search
    await inputSearchNote.fill("--");
    await expect(page.getByText("We didn't find any note with that title or name")).toBeVisible();

    /// delete added note
    await inputSearchNote.fill("");
    const btnDeleteNote = noteAdded.getByRole("button", { name: /x/i, exact: true });
    btnDeleteNote.click();

    await expect(
      noteAdded.getByText(NOTES[0].title, {
        exact: true,
      })
    ).not.toBeVisible();

    await expect(emptyNotesElem).toBeVisible();

    await page.pause();
  });
});
