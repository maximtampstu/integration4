import { getAllArtTypes } from "../services/art";
import { Link } from "react-router";

export async function clientLoader() {
  const artTypes = await getAllArtTypes(); //done
  return { artTypes };
}

export default function UploadList({ loaderData }) {
  const { artTypes } = loaderData;

  return (
    <main className="art-type-selector">
      <h1>Select Art Type</h1>
      <ul>
        {artTypes.map((type) => (
          <li key={type.id}>
            <Link to={`/upload/${type.id}`}>{type.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
