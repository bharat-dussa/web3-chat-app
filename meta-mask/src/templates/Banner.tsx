import Link from 'next/link';

import { Button } from '../elements/button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';
import { ROUTES } from '../utils/api.util';

const Banner = () => (
  <Section>
    <CTABanner
      title="Powerful yet simple"
      subtitle=""
      button={
        <Link href={ROUTES.AUTH}>
          <a>
            <Button>Get Started</Button>
          </a>
        </Link>
      }
    />
  </Section>
);

export { Banner };
