import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "./page.module.css";

// Components
import Chart from "./components/Chart";

export default async function Page({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}) {
  const { countryCode } = await params;

  const response = await fetch(
    `http://localhost:4000/api/countries/${countryCode}`,
  );
  const { data } = await response.json();

  if (!data) {
    return (
      <div className={styles.not_found}>
        <span>Not Found</span>
        <Link href="/">Home</Link>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.home_link}>
        Home
      </Link>

      <div className={styles.flag_container}>
        <Image src={data.flag} alt={data.name} width={100} height={100} />
      </div>

      <span className={styles.name}>{data.name}</span>

      <span className={styles.official_name}>{data.officialName}</span>

      <span className={styles.region}>Region: {data.region}</span>

      <div className={styles.borders_container}>
        <span>Borders:</span>

        {data.borders.map(
          (border: { commonName: string; countryCode: string }) => (
            <Link key={border.commonName} href={`/${border.countryCode}`}>
              {border.commonName}
            </Link>
          ),
        )}
      </div>

      <div>
        <Chart data={data.population} />
      </div>
    </main>
  );
}
