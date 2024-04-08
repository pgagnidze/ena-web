import { Container } from "@/components/ContainerForFeatures";

const features = [
  {
    name: "ისწავლეთ ხელოვნურ ინტელექტთან ერთად",
    description:
      "AI დაგეხმარებათ განმარტოთ კოდი, იპოვოთ შეცდომები და მიიღოთ პასუხები თქვენს შეკითხვებზე.",
    icon: AI,
  },
  {
    name: "გაუშვით პროგრამა აქვე",
    description:
      "კოდის გამშვების გამოყენებით თქვენ შეგიძლიათ აქვე დაწეროთ და გაუშვათ კოდი, გაეცნოთ სინტაქსსა და ენის სხვა მახასიათებლებს.",
    icon: Code,
  },
  {
    name: "გაეცანით დოკუმენტაციას",
    description:
      "დოკუმენტაცია აღწერს, თუ როგორ უნდა დააინსტალიროთ და გამოიყენოთ პროგრამული ენა თქვენს კომპიუტერზე. აქვე დეტალურად არის ახსნილი ენის სინტაქსი და სხვა გამოყენების წესები.",
    icon: Document,
  },
];

function AI(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    </svg>
  );
}

function Code(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function Document(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

export function Features() {
  return (
    <section>
      <Container>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-slate-400/10 p-8"
            >
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900 text-base">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-700 text-sm">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
