import Head from "next/head";
import { useState } from "react";
import Audio from "./audio";
import styles from "./index.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: query }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQuery("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Ask Aristotle</title>
      </Head>

      <main className={styles.main}>
      <img src="/aristotle.png" className={styles.icon} />
      <Audio src="/frostfall.mp3" autoPlay={false} />
        <h3>Ask Aristotle</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="query"
            placeholder="What's on your mind today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input type="submit" value="Ask" />
        </form>
        <div className={`${styles.result} multi-line-text`}>{result}</div>
      </main>
    </div>
  );
}