import Link from "next/link";

// Styles
import styles from "./page.module.css";

export default async function Home() {
  const response = await fetch("http://localhost:4000/api/countries");
  const { data } = await response.json();

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Countries</h1>

      <div className={styles.container}>
        {data.map(
          ({ countryCode, name }: { countryCode: string; name: string }) => (
            <Link key={name} href={`/${countryCode}`} className={styles.link}>
              {name}
            </Link>
          ),
        )}
      </div>
    </main>
  );
}
