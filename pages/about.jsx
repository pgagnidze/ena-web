import Head from 'next/head'
import { Container } from '@/components/Container'

export default function About() {
  return (
    <>
      <Head>
        <title>Voluptates - Autem Ratione</title>
        <meta
          name="description"
          content="I’m Spencer Sharp. I live in New York City, where I design the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32 py-4">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800">
            Velit ut enim ratione animi et aut perferendis.
            Omnis mollitia quia ut minima. Sit quam iste aut sequi aut.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600">
              <p>
                Fugit sapiente neque sunt omnis exercitationem fugiat.
                Excepturi voluptatem quae rerum consectetur. 
                Architecto consequuntur distinctio ex vel quidem maiores et non.
                Corporis aperiam dicta neque ut voluptatum est delectus minus.
                Repudiandae dolorum laboriosam minima voluptates ea sit.
              </p>
              <p>
              Tempora enim voluptas omnis molestias reprehenderit. Quia omnis autem voluptatem.
              Ab nostrum labore voluptatem omnis repudiandae.
              Unde et ut repellat error doloribus et porro quidem.
              </p>
              <p>
              Deleniti officiis molestiae sapiente eum asperiores non iure.
              Ut enim inventore est magni sequi architecto facere eos.
              Doloremque enim pariatur neque repudiandae quis soluta voluptatem vel.
              </p>
              <p>
              Aut accusamus est et sint non officiis. Earum voluptas maiores sint architecto aliquid non suscipit.
              Omnis laboriosam officiis repellat modi. In et minima quos ut vel dolor ea.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
