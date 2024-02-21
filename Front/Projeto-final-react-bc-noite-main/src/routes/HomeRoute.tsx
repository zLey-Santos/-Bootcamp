import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Card } from "../components/Card";
import { api } from "../api";
import { INotepad, IResponseGetNotepad } from "../interfaces/INotepad";
import { Helmet } from "react-helmet";
import { LinkButton } from "../components/LinkButton";

const initialNotepads: INotepad[] = [];
const initialLoading = true;

export function HomeRoute() {
  const [notepads, setNotepads] = useState<INotepad[]>(initialNotepads);
  const [loading, setLoading] = useState(initialLoading);

  const pageSize = 2;
  const pageCount = Math.ceil(notepads.length / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);
  const location = useLocation();

  async function fetchNotepads() {
    const response = await api.get<IResponseGetNotepad>("/notepads");
    const fetchedNotepads = response.data.notepads;
    setNotepads(fetchedNotepads);
    setLoading(false);
  }

  useEffect(() => {
    fetchNotepads();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Card>
      <Helmet>
        <title>Home | Notepads</title>
      </Helmet>

      {loading && (
        <div className="flex justify-center">
          <FaSpinner className="text-4xl animate-spin" />
        </div>
      )}

      {notepads.map(notepad => (
        <Link
          to={`/view-notepad/${notepad.id}`}
          key={notepad.id}
          className="border-b py-2 cursor-pointer block">
          <div className="text-gray-500 mb-2">#{notepad.id}</div>

          <span className="text-sm text-gray-500">
            {new Date(notepad.created_at).toLocaleDateString()}
          </span>

          <h2 className="text-lg font-bold leading-tight pb-1">
            {notepad.title}
          </h2>

          <p>{notepad.subtitle}</p>
        </Link>
      ))}

      <div className="flex flex-row gap-2 flex-wrap pt-4">
        {pages.map(page => (
          <LinkButton key={page} to={`/notepads/${page}`}>
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
