import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Bitcoin Transcripts</h1>
      <nav>
        <ul>
          <li>
            <Link href="/sources">Sources</Link>
          </li>
          <li>
            <Link href="/tags">Tags</Link>
          </li>
          <li>
            <Link href="/speakers">Speakers</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
