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
  {
    title: "Edited title note3",
    note: "Edited note3",
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto(URL_APP);
});

test.describe("E2E App", () => {
  test("Add note, search note and remove note", async ({ page }) => {
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

    /// open modal new note
    const btnOpenModalHome = page.getByRole("button", { name: /Add new note/i, exact: true });
    btnOpenModalHome.click();

    /// add note in modal
    const inputNoteTitle = page.getByPlaceholder("Add note title", { exact: true });
    const inputNote = page.getByPlaceholder("Add note", { exact: true });

    await inputNoteTitle.fill(NOTES[0].title);
    await inputNote.fill(NOTES[0].note);

    const btnAddNoteModal = page.getByRole("button", { name: /Add note/i, exact: true });
    btnAddNoteModal.click();

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

    /// remove added note --- NOT WORKING
    await inputSearchNote.fill("");
    const buttonDotsNote = noteAdded.getByTestId("button-dots-note");
    buttonDotsNote.click();

    const noteParent = page.getByTestId("note-parent");
    const btnRemoveNote = noteParent.getByRole("button", { name: /Remove/i, exact: true });
    btnRemoveNote.click();

    await expect(
      noteAdded.getByText(NOTES[0].title, {
        exact: true,
      })
    ).toBeVisible();
    await expect(emptyNotesElem).not.toBeVisible();

    /// new note to edit
    btnOpenModalHome.click();
    await inputNoteTitle.fill(NOTES[1].title);
    await inputNote.fill(NOTES[1].note);
    const btnAddNoteModal2 = page.getByRole("button", { name: /Add note/i, exact: true });
    await expect(btnAddNoteModal2).toBeVisible();
    btnAddNoteModal2.click();

    /// open modal edit note
    page.getByTestId("note-parent").getByTestId("button-dots-note").click();
    const btnEditNoteModal = page.getByTestId("note-parent").getByRole("button", { name: /Edit note/i, exact: true });
    await expect(btnEditNoteModal).toBeVisible();
    btnEditNoteModal.click();

    /// edit note
    await expect(page.getByText("Edit note")).toBeVisible();

    const inputEditNoteTitle = page.getByPlaceholder("Edit note title", { exact: true });
    const inputEditNote = page.getByPlaceholder("Edit note", { exact: true });

    await expect(inputEditNoteTitle).toBeVisible();
    await expect(inputEditNote).toBeVisible();

    await page.pause();
  });
});
