export function About() {
  return (
    <section id="about" className="section about-section">
      <h2>About</h2>
      <p>
        We&apos;re in the 21st century, with broad access to the internet and even smartphones,
        yet literacy rates are still not 100% everywhere.<sup>
          <a href="#fn1">1</a>
        </sup>
        <sup>
          <a href="#fn2">2</a>
        </sup>
      </p>
      <p>
        Every human on Earth should be able to read and write for their own benefit. Literacy helps
        plug them into human civilisation.
      </p>
      <p>
        People are smart. They don&apos;t need a school to teach them. Modern software should be able
        to enable them to know the alphabet in less than a day; be familiar with a few core words
        within a few days; and read and write many common words in under a month (at least with
        phonetic languages they know orally). It should then support their literacy continuously
        thereafter.
      </p>
      <p>Learnreadgood.com aims to tackle this in a simple way.</p>
      <ol className="footnotes">
        <li id="fn1">
          <a
            href="https://worldpopulationreview.com/country-rankings/literacy-rate-by-country"
            target="_blank"
            rel="noreferrer"
          >
            Literacy rate by country — World Population Review
          </a>
        </li>
        <li id="fn2">
          <a
            href="https://en.wikipedia.org/wiki/List_of_countries_by_number_of_mobile_numbers_in_use"
            target="_blank"
            rel="noreferrer"
          >
            Countries by mobile numbers in use — Wikipedia
          </a>
        </li>
      </ol>
    </section>
  )
}
