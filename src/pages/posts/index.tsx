import styles from './styles.module.scss'
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrimiscClient } from './../../services/primisc';
import  Prismic  from '@prismicio/client';


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {


    posts.map(post => {
        console.log(post.excerpt )
    })

    return (
        <>

            <Head>
                <title> Posts | Ignews </title>
            </Head>

            <main className={ styles.container }>
                <div  className={ styles.posts }>
                    
                    { posts.map(post => (
                            // eslint-disable-next-line react/jsx-key
                            <a href="#" key={post.slug}>
                                <time>
                                    { post.updatedAt }
                                </time>
        
                                <strong>
                                    { post.title }
                                </strong>
                                <div>
                                    <div className={styles.excerpt}>
                                        <p>
                                            { post.excerpt }
                                        </p>
                                    </div>

                                    <div className={styles.hidden} > 
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        )) 
                    
                    }

                </div>
            </main>

        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrimiscClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication'),
        ], {
            fetch: ['publication.Title', 'publication.post'],
            pageSize: 100,
        }
    )
    
    console.log("X:::::::::::::::::::::::::X", JSON.stringify(response, null, 2))


    const posts = response.results.map(posts => {
        return {
            slug: posts.uid,
            title: posts.data.Title[0].text,
            excerpt: posts.data.post.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(posts.last_publication_date).toLocaleDateString('pt-BR',{
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        }
    })
    
    return {
        props: {
            posts
        }
    }
}