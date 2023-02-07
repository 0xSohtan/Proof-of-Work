import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export default function pow({ user, Contributions }) {

    console.log(Contributions);

    return (
        <div className={styles.container}>
            <Head>
                <title>Proof of Work</title>
                <meta name="description" content="Proof of Work" />
            </Head>
            <div>
                Proof of Work
            </div>
            <div className='totalContributions'>
                Total Contributions this year: {user.contributionsCollection.contributionCalendar.totalContributions}
            </div>
            <div className='graph'>
                <ul className={styles.squers}>
                    <style jsx>{`li {background-color: grey ; border-radius: 3px; width: 12px; height: 12px; margin: 1px 1px; font-size: 0px}`}</style>
                    {Contributions.map((Contribution, index) => (
                        <li key={index}>{Contribution.contributionDays[0]?.date}</li>
                    ))}
                </ul>
                <ul className={styles.squers}>
                    <style jsx>{`li {background-color: grey ; border-radius: 3px; width: 12px; height: 12px; margin: 1px 1px; font-size: 0px}`}</style>
                    {Contributions.map((Contribution, index) => (
                        <li key={index}>{Contribution.contributionDays[1]?.date}</li>
                    ))}
                </ul>
                <ul className={styles.squers}>
                    <style jsx>{`li {background-color: grey ; border-radius: 3px; width: 12px; height: 12px; margin: 1px 1px; font-size: 0px}`}</style>
                    {Contributions.map((Contribution, index) => (
                        <li key={index}>{Contribution.contributionDays[2]?.date}</li>
                    ))}
                </ul>
                <ul className={styles.squers}>
                    {Contributions.map((Contribution, index) => (
                        <li key={index}>{Contribution.contributionDays[3]?.date}</li>
                    ))}
                </ul>
                <ul className={styles.squers}>
                    {Contributions.map((Contribution, index) => (
                        <li key={index}>{Contribution.contributionDays[4]?.date}</li>
                    ))}
                </ul>
                <ul className={styles.squers}>
                    {Contributions.map((Contribution, index) => (
                        <li key={index}>{Contribution.contributionDays[5]?.date}</li>
                    ))}
                </ul>
                <ul className={styles.squers}>
                    {Contributions.map((Contribution, index) => (
                        <li key={index} className={"bg-black"}>{Contribution.contributionDays[6]?.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export async function getStaticProps() {
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: gql`
        {
            user(login: "0xSohtan") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      contributionCount
                      contributionLevel
                      date
                      weekday
                      color
                    }
                    firstDay
                  }
                  colors
                  totalContributions
                }
                contributionYears
              }
            }
          }
      `,
    });
    const { user } = await data;
    const Contributions = user.contributionsCollection.contributionCalendar.weeks;

    return {
        props: {
            user,
            Contributions,
        }
    }
}