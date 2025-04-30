import { HomePage } from "./home/component/homePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Як грати в "Гаряче слово"',
    description:
        'Дізнайся, як грати у гру "Гаряче слово" — вгадай секретне слово за принципом гаряче-холодно. Необмежені спроби, підказки через схожість слів!',
};
export default async function Home() {
    return <HomePage />;
}
