import Head from "next/head";
import { useState } from "react";
import Audio from "./audio";
import styles from "./index.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [philosopher, setPhilosopher] = useState("aristotle");
  const formattedPhilosopher = philosopher.charAt(0).toUpperCase() + philosopher.slice(1);

  const handlePhilosopherChange = (event) => {
    const newPhilosopher = event.target.value;
    setPhilosopher(newPhilosopher);
    setResult("");
  };
  

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, philosopher }),
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
        <title>Ask a Philosopher</title>
        <link rel="icon" href="favicon_io/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>

      <main className={styles.main}>
      <select onChange={handlePhilosopherChange} value={philosopher} className={styles.select}>
      <option value="aristotle">Aristotle</option>
      <option value="kant">Kant</option>
      <option value="mill">Mill</option>
      <option value="laozi">Laozi </option>
      <option value="buddha">Buddha</option>
      </select>
      <img src={`/${philosopher}.png`} alt="Philosopher Sprite" className={styles.sprite} />
      <Audio src="/frostfall.mp3" autoPlay={false} />
        <h3>Ask {formattedPhilosopher}</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="query"
            placeholder="What's on your mind?"
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