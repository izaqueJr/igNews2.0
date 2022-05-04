/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps } from 'next'
import { RichText } from 'prismic-dom';
import  styles from '../post.module.scss'
import { getPrismicClient } from '../../../services/prismic';
import  Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PostsPreviewProps {
    post:{
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}



export default function PostPreview({ post } : PostsPreviewProps) {
    
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(session?.activeSubscription){
            router.push(`/posts/${post.slug}`)
        }

    }, [session])


    return(
        <>
            <Head>
                <title>{post.title} | Ignews </title>
            </Head> 

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>

                    <time>{post.updatedAt}</time>
                    
                    <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html: post.content}}>
        
                    </div>

                    <div className={ styles.continueReading }> 
                        wanna continue reading?
                        <Link href="/">
                            <a > Subscribe now 🤗 </a>
                        </Link>

                    </div>

                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params

    const prismic = getPrismicClient()
    const response = await prismic.getByUID<any>('publication', String(slug), {}) 

    const post = {
        slug,
        title: response?.data?.Title[0].text,
        content: RichText.asHtml(response.data?.post.splice(0, 3)),
        updatedAt: new Date(response?.last_publication_date).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return {
        props: {
            post,
        },
        redirect: 60 * 30 // redirect after 30 minutes
    }
}