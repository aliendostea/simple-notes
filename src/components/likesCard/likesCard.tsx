import Wrapper from "./wrapper";

async function getData() {
  try {
    const response = await fetch("http://localhost:1234/api/likes/v1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (res.status === 200 && res.ok) {
      const [appNotes] = res.response.apps.filter((app: any) => app.name === "simple-notes");

      return appNotes.likes ?? 0;
    }

    if (!response.ok) {
      console.log("res", response.status);
      throw new Error("Error en petición");
    }
  } catch (error) {
    console.log("Error occurred-----------------", error);
    return 0;
    // throw new Error("Error en petición");
  }
}

export default async function LikesCard() {
  const initialLikes = await getData();

  return <Wrapper initialLikes={initialLikes} />;
}
