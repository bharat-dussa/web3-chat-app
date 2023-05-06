import Link from "next/link";

import { Background } from "../background/Background";
import { Button } from "../button/Button";
import { HeroOneButton } from "../hero/HeroOneButton";
import { Section } from "../layout/Section";
import { NavbarTwoColumns } from "../navigation/NavbarTwoColumns";
import { Logo } from "./Logo";
import { useRouter } from "next/router";
import { ROUTES } from "../utils/api.util";

const Hero = () => {
  const router = useRouter();

  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>
          <li>
            <button onClick={() => router.push(ROUTES.AUTH)}>
              Sign in with Meta mask
            </button>
          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {"The New generation chat application\n"}
              <span className="text-primary-500">Meta Chat</span>
            </>
          }
          description=""
          button={
            <Link href={ROUTES.AUTH}>
              <a>
                <Button xl>Let's get started</Button>
              </a>
            </Link>
          }
        />
      </Section>
    </Background>
  );
};

export { Hero };